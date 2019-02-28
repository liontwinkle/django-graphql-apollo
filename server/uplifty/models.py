"""Uplifty database models."""

import uuid
from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    """Blog Post model."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=200, unique=True)
    body = models.TextField()
    author = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    slug = models.SlugField(unique=True)

    class Meta:
        """Add ordering."""

        ordering = ["-created_at"]
