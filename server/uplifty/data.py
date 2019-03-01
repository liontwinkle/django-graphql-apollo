"""Initialize databse with some test data."""

from .models import Post, User


def initialize():
    """Create authors and posts."""
    bozho = User.objects.create(
        username="bozho",
        first_name="Bozhidar",
        last_name="Hristov",
        email="bozidar.hristov@gmail.com",
    )
    bozho.save()
    paul = User.objects.create(
        username="paul",
        first_name="Paul",
        last_name="Craciunoiu",
        email="paul@example.com",
    )
    paul.save()
    blog_by_bozho = Post.objects.create(
        title="Harnessing the full power of GraphQL & Django",
        body="Some tricks learned while developing with DJango & Graphene.",
        author=bozho,
    )
    blog_by_bozho.save()
    blog_by_paul = Post.objects.create(
        title="Dev skills evaluation",
        body="These are the things I've learned while eevaluating new developers.",
        author=paul,
    )
    blog_by_paul.save()
