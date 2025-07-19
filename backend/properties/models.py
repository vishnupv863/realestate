from django.db import models
from django.conf import settings


class Property(models.Model):
    broker = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="properties",
        help_text="The broker who is uploading the property.",
    )
    title = models.CharField(max_length=255, help_text="Title of the property.")
    description = models.TextField(help_text="Detailed description of the property.")
    price = models.DecimalField(
        max_digits=10, decimal_places=2, help_text="Price of the property."
    )
    city = models.CharField(
        max_length=255, help_text="City where the property is located."
    )
    location = models.CharField(max_length=255, help_text="Location of the property.")
    images = models.ImageField(
        upload_to="property_images/", help_text="Image of the property."
    )
    image_2 = models.ImageField(
        upload_to="property_images/",
        blank=True,
        null=True,
        help_text="Optional second image of the property.",
    )
    image_3 = models.ImageField(
        upload_to="property_images/",
        blank=True,
        null=True,
        help_text="Optional third image of the property.",
    )
    image_4 = models.ImageField(
        upload_to="property_images/",
        blank=True,
        null=True,
        help_text="Optional fourth image of the property.",
    )
    image_5 = models.ImageField(
        upload_to="property_images/",
        blank=True,
        null=True,
        help_text="Optional fifth image of the property.",
    )
    image_6 = models.ImageField(
        upload_to="property_images/",
        blank=True,
        null=True,
        help_text="Optional sixth image of the property.",
    )
    created_at = models.DateTimeField(
        auto_now_add=True, help_text="The date and time when the property was created."
    )
    updated_at = models.DateTimeField(
        auto_now=True, help_text="The date and time when the property was last updated."
    )

    def __str__(self):
        return self.title
