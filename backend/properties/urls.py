from django.urls import path
from .views import submit_property
from .views import health_check

urlpatterns = [
    path("submit-property/", submit_property, name="submit_property"),
    path("", health_check, name="health_check"),
]
