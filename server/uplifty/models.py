"""Uplifty database models."""

import uuid
from django.db import models
from django.contrib.auth.models import User


# class Author(AbstractUser):
#     """Model for Author."""

#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     created_at = models.DateTimeField()
#     modified = models.DateTimeField()
#     username = models.CharField(
#         max_length=32, validators=[UserModel.username_validator], unique=True
#     )
#     full_name = models.CharField(max_length=100)
#     # email =


class Post(models.Model):
    """Blog Post model."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=200)
    body = models.TextField()
    author = models.ForeignKey(User, on_delete=models.DO_NOTHING)
