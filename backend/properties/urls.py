from .views import property_list
from django.urls import path

urlpatterns = [
    path("properties/", property_list, name="property_list"),
]
