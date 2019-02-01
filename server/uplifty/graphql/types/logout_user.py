"""Logout mutation."""

from django.contrib.auth import logout
import graphene


class LogoutUser(graphene.Mutation):
    """Authentication mutation, deletes the session."""

    success = graphene.Boolean()

    def mutate(self, info, **kwargs):
        """Log the user out from Django."""
        logout(info.context)
        return LogoutUser(success=True)
