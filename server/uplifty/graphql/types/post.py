"""Post GraphQL types."""

from graphene_django import DjangoObjectType

from uplifty.models import Post


class Post(DjangoObjectType):
    """GraphQL type for the User model."""

    class Meta:
        model = Post
        # only_fields = ("email", "username")

    # def resolve_title(self, info, **kwargs):
    #     """Keep email private except if you're the current user."""
    #     print("POST TYPE RESOLVER: ", info.context)
    #     post_id = info.context.post_id
    #     post = Post.objects.get(id=post_id)
    #     title = post.title
    #     return title
