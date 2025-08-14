from urllib import request
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import PropertyForm
from django.contrib.auth.decorators import login_required


@login_required
def submit_property(request):
    if request.method != "POST":
        return JsonResponse(
            {"status": "error", "message": "Only POST requests are allowed."},
            status=405,
        )

    print("POST keys:", request.POST.keys())
    print("FILES keys:", request.FILES.keys())

    form = PropertyForm(request.POST, request.FILES)
    if not form.is_valid():
        print("Validation errors:", form.errors)
        return JsonResponse({"status": "error", "errors": form.errors}, status=400)

    # Step 1: Save core metadata, but delay full commit to assign broker
    property_obj = form.save(commit=False)
    property_obj.broker = request.user
    property_obj.save()  # Saves required fields like title, price, etc.

    # Step 2: Attach any uploaded image files
    image_fields = ["images", "image_2", "image_3", "image_4", "image_5", "image_6"]
    for field in image_fields:
        if field in request.FILES:
            setattr(property_obj, field, request.FILES[field])

    # Step 3: Save again to persist all image uploads
    property_obj.save()  # Ensures file uploads are committed to S3 via the storage backend

    # Step 4: Prepare JSON response including successfully uploaded image URLs
    response_data = {
        "status": "success",
        "property_id": property_obj.id,
        "uploaded_images": [
            getattr(property_obj, f).url
            for f in image_fields
            if getattr(property_obj, f)
        ],
    }

    return JsonResponse(response_data, status=201)


def sample_view(request):
    return JsonResponse({"message": "This is a sample view."})
