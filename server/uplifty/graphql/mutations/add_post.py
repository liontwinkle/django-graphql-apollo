"""Add new Post mutation."""

import graphene
from django.contrib.auth.models import User

from uplifty.models import Post


class AddPost(graphene.Mutation):
    """Add new blog post."""

    success = graphene.Boolean()
    id = graphene.UUID()
    title = graphene.String()
    body = graphene.String()
    created_at = graphene.DateTime()

    class Arguments:
        """Input arguments for creating a blog post."""

        title = graphene.String()
        body = graphene.String()
        author = graphene.String()

    def mutate(self, info, title, body, author, **kwargs):
        """Create new blog post."""
        author = User.objects.get(username=author)
        new_post = Post.objects.create(title=title, body=body, author=author)
        new_post.save()
        return AddPost(
            success=True, id=new_post.id, title=new_post.title, body=new_post.body
        )


class Mutation(graphene.ObjectType):
    """Register Add Post Mutation as field."""

    add_post = AddPost.Field()
