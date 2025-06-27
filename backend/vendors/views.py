from django.http import JsonResponse


def listing_list(request):
    return JsonResponse({"listings": ["House A", "House B", "Land C"]})
