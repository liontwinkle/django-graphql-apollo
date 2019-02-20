"""Delete existing Post mutation."""

import graphene

from uplifty.models import Post


class DeletePost(graphene.Mutation):
    """Add new blog post."""

    success = graphene.Boolean()

    class Arguments:
        """Input argument id for deleting a single blog post."""

        id = graphene.UUID()

    def mutate(self, info, id, **kwargs):
        """Create new blog post."""
        post = Post.objects.get(id=id)
        post.delete()
        return DeletePost(success=True)


class Mutation(graphene.ObjectType):
    """Register Delete Post Mutation as field."""

    delete_post = DeletePost.Field()
