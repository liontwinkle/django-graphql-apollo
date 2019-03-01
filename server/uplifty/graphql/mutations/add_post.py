"""Add new Post mutation."""

import graphene
from django.contrib.auth.models import User
from django.utils.text import slugify

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
        author_model = User.objects.get(username=author)
        slug = slugify(title)
        new_post = Post.objects.create(
            title=title, body=body, author=author_model, slug=slug
        )
        new_post.save()
        return AddPost(
            success=True,
            id=new_post.id,
            title=new_post.title,
            body=new_post.body,
            created_at=new_post.created_at,
            # author=author,
        )


class Mutation(graphene.ObjectType):
    """Register Add Post Mutation as field."""

    add_post = AddPost.Field()
