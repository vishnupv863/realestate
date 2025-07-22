from django.urls import path
from .views import submit_property

urlpatterns = [
    path("submit-property/", submit_property, name="submit_property"),
]
