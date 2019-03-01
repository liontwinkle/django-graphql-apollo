"""Edit existing Post mutation."""

import graphene
from django.utils.text import slugify
from graphql import GraphQLError

from uplifty.models import Post
from uplifty.graphql.types.author import Author


class EditPost(graphene.Mutation):
    """Add new blog post."""

    success = graphene.Boolean()
    id = graphene.UUID()
    title = graphene.String()
    body = graphene.String()
    created_at = graphene.DateTime()
    slug = graphene.String()
    author = graphene.Field(Author)

    class Arguments:
        """Input arguments for modifying an existing post.

        Expects all three arguments.
        """

        id = graphene.UUID()
        title = graphene.String()
        body = graphene.String()

    def mutate(self, info, id, title, body, **kwargs):
        """Create new blog post."""
        post = Post.objects.get(id=id)
        post.body = body
        post.title = title
        post.slug = slugify(title)
        try:
            post.save()
            return EditPost(
                success=True,
                id=post.id,
                title=post.title,
                body=post.body,
                slug=post.slug,
                author=post.author,
            )
        except Exception as e:
            raise GraphQLError(e)


class Mutation(graphene.ObjectType):
    """Register Edit Post Mutation as field."""

    edit_post = EditPost.Field()
