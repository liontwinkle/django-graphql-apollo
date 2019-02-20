"""Author GraphQL types."""

from graphene_django import DjangoObjectType

from django.contrib.auth.models import User


class Author(DjangoObjectType):
    """GraphQL type for the User model."""

    class Meta:
        model = User
        # only_fields = ("email", "username")

    # def resolve_title(self, info, **kwargs):
    #     """Keep email private except if you're the current user."""
    #     print("POST TYPE RESOLVER: ", info.context)
    #     post_id = info.context.post_id
    #     post = User.objects.get(id=post_id)
    #     title = post.title
    #     return title
