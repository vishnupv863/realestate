from django.urls import path

from .views import (
    RegisterView,
    LoginView,
    LogoutView,
    MeView,
    GetCSRFToken,
    GoogleOneTapLoginView,  # ✅ updated
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("me/", MeView.as_view(), name="me"),
    path("csrf/", GetCSRFToken.as_view(), name="csrf"),
    path(
        "google-login/", GoogleOneTapLoginView.as_view(), name="google_login"
    ),  # ✅ use OneTap handler
]
