"""Edit existing Post mutation."""

import graphene

from uplifty.models import Post


class EditPost(graphene.Mutation):
    """Add new blog post."""

    success = graphene.Boolean()
    id = graphene.UUID()
    title = graphene.String()
    body = graphene.String()
    created_at = graphene.DateTime()

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
        post.save()
        return EditPost(success=True, id=post.id, title=post.title, body=post.body)


class Mutation(graphene.ObjectType):
    """Register Edit Post Mutation as field."""

    edit_post = EditPost.Field()
