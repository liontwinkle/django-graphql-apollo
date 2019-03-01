"""Author GraphQL types."""

from graphene_django import DjangoObjectType

from django.contrib.auth.models import User


class Author(DjangoObjectType):
    """GraphQL type for the User model."""

    class Meta:
        model = User
