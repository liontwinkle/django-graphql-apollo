"""Post GraphQL types."""

from graphene_django import DjangoObjectType

from uplifty.models import Post


class Post(DjangoObjectType):
    """GraphQL type for the User model."""

    class Meta:
        model = Post
