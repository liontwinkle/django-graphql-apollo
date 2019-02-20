"""GraphQL schema specific to this app."""

import graphene
from django.contrib.auth.models import User

from uplifty.models import Post
from .types.logout_user import LogoutUser
from .types.user import User as UserNode
from .types.post import Post as PostNode
from .types.author import Author as AuthorNode
from .mutations import add_post, edit_post, delete_post


class MeQuery(graphene.ObjectType):
    """Queries specific to uplifty app."""

    class Meta:
        abstract = True

    me = graphene.Field(UserNode)

    def resolve_me(self, info, **kwargs):
        """Return the current logged in user."""
        return info.context.user


class MeMutation(graphene.ObjectType):
    """Mutations specific to uplifty app."""

    class Meta:
        abstract = True

    logout_user = LogoutUser.Field(description="Log the user out.")


class Query(graphene.ObjectType):
    """Query for blog post."""

    posts = graphene.List(PostNode)
    post = graphene.Field(PostNode, id=graphene.UUID())
    author = graphene.Field(AuthorNode, id=graphene.Int(), username=graphene.String())

    def resolve_posts(self, info, **kwargs):
        """Resolve all blog posts."""
        print("Resolving Post list: ", info.context)
        return Post.objects.order_by("-created_at").all()

    def resolve_post(self, info, id=None, **kwargs):
        """Resolve a single post."""
        print("Resolving Single Post: ", info.context)
        if id:
            return Post.objects.get(id=id)

    def resolve_author(self, info, id=None, username=None, **kwargs):
        """Resolve Author profile."""
        print("IN AUTHOR FIELD: ", id, username)
        if id:
            return User.objects.get(id=id)
        if username:
            return User.objects.get(username=username)


class Mutation(
    delete_post.Mutation, add_post.Mutation, edit_post.Mutation, graphene.ObjectType
):
    """Mutations specific to uplifty app."""
