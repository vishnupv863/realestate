from django.urls import path
from .views import submit_property
from .views import sample_view

urlpatterns = [
    path("submit-property/", submit_property, name="submit_property"),
    path("/", sample_view, name="sample_view"),
]
