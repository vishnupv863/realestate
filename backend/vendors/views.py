from django.http import JsonResponse


def listing_list(request):
    return JsonResponse({"listings": ["Nasim friend", "Phone number", "Address"]})
