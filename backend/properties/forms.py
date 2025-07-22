from django import forms
from .models import Property


class PropertyForm(forms.ModelForm):
    class Meta:
        model = Property
        fields = "__all__"

    def clean(self):
        cleaned_data = super().clean()

        # Collect all image fields
        uploaded_images = [
            cleaned_data.get("images"),
            cleaned_data.get("image_2"),
            cleaned_data.get("image_3"),
            cleaned_data.get("image_4"),
            cleaned_data.get("image_5"),
            cleaned_data.get("image_6"),
        ]

        # Count how many images were actually submitted
        image_count = len([img for img in uploaded_images if img])
        print(f"{image_count} image(s) uploaded with this property.")

        return cleaned_data
