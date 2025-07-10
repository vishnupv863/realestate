from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.utils.decorators import method_decorator

from .models import CustomUser
from .serializers import RegisterSerializer


@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"message": "CSRF cookie set"}, status=200)


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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        login_input = request.data.get("login")
        password = request.data.get("password")
        user = None

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


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response(
            {"id": user.id, "name": user.name, "email": user.email, "phone": user.phone}
        )
