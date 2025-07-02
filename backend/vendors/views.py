from django.http import JsonResponse


def property_list(request):
    return JsonResponse({"properties": ["Nasim friend", "Phone number", "Address"]})
