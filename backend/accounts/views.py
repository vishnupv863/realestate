from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect
from django.utils.decorators import method_decorator
from django.http import JsonResponse
import json

from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

from .models import CustomUser
from .serializers import RegisterSerializer

User = get_user_model()


# -------------------- CSRF --------------------
@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"message": "CSRF cookie set"}, status=200)


# -------------------- Register --------------------
@method_decorator(ensure_csrf_cookie, name="dispatch")
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            login(request, user)  # ✅ Auto-login after registration
            return Response(
                {"message": "User registered successfully", "name": user.name},
                status=status.HTTP_201_CREATED,
            )
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -------------------- Login (email or phone) --------------------
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        login_input = request.data.get("login")
        password = request.data.get("password")

        if not login_input or not password:
            return Response(
                {"error": "Login and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            if "@" in login_input:
                user_obj = CustomUser.objects.get(email=login_input)
            else:
                user_obj = CustomUser.objects.get(phone=login_input)

            user = authenticate(request, email=user_obj.email, password=password)

        except CustomUser.DoesNotExist:
            return Response(
                {"error": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )

        if user:
            login(request, user)
            return Response(
                {"message": "Login successful", "name": user.name},
                status=status.HTTP_200_OK,
            )

        return Response(
            {"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED
        )


# -------------------- Logout --------------------
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)


# -------------------- Me --------------------
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response(
            {"id": user.id, "name": user.name, "email": user.email, "phone": user.phone}
        )


# -------------------- Google One Tap Login --------------------
@method_decorator(csrf_protect, name="dispatch")
class GoogleOneTapLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            data = json.loads(request.body)
            token = data.get("token")

            if not token:
                return JsonResponse(
                    {"non_field_errors": ["Token not provided"]}, status=400
                )

            # Verify token using Google
            idinfo = id_token.verify_oauth2_token(
                token,
                google_requests.Request(),
                "755316712991-cbk4pp2q2e20ds0800rpu4e87g2bom8h.apps.googleusercontent.com",  # ✅ Your Client ID
            )

            email = idinfo.get("email")
            name = idinfo.get("name")

            if not email:
                return JsonResponse(
                    {"non_field_errors": ["Email not found in token"]}, status=400
                )

            # Find or create user
            user, created = User.objects.get_or_create(
                email=email, defaults={"username": email, "name": name}
            )

            login(request, user)
            return JsonResponse(
                {"message": "Google login successful", "name": user.name}
            )

        except ValueError:
            return JsonResponse({"non_field_errors": ["Invalid token"]}, status=400)

        except Exception as e:
            return JsonResponse({"non_field_errors": [str(e)]}, status=500)
