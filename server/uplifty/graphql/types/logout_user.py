import graphene

from django.contrib.auth import logout


class LogoutUser(graphene.Mutation):
    """Authentication mutation, deletes the session."""

    success = graphene.Boolean()

    def mutate(self, info, **kwargs):
        logout(info.context)
        return LogoutUser(success=True)
