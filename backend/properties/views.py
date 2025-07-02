from django.shortcuts import render
from django.http import JsonResponse


def property_list(request):
    # Sample data for demonstration purposes
    properties = [
        {"id": 1, "name": "Property 1", "location": "Location 1", "price": 100000},
        {"id": 2, "name": "Property 2", "location": "Location 2", "price": 200000},
        {"id": 3, "name": "Property 3", "location": "Location 3", "price": 300000},
    ]

    return JsonResponse({"properties": properties})
