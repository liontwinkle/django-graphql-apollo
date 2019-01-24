import graphene

from .types.logout_user import LogoutUser
from .types.user import User as UserNode


class Query(graphene.ObjectType):
    class Meta:
        abstract = True

    me = graphene.Field(UserNode)

    def resolve_me(self, info, **kwargs):
        return info.context.user


class Mutation(graphene.ObjectType):
    class Meta:
        abstract = True

    logout_user = LogoutUser.Field(description="Log the user out.")
