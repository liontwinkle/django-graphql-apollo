"""Test Posts."""

import pytest
from collections import OrderedDict

from uplifty.data import initialize
from uplifty.schema import schema
from uplifty.models import Post

pytestmark = pytest.mark.django_db


def test_single_post():
    """Test retrieval of a single blog post."""
    initialize()
    post_id = Post.objects.get(title="Dev skills evaluation").id
    query = """{{
                post(id: "{}") {{
                    id
                    title
                    body
                }}
            }}""".format(
        post_id
    )
    expected = OrderedDict(
        {
            "post": OrderedDict(
                {
                    "id": str(post_id),
                    "title": "Dev skills evaluation",
                    "body": (
                        "These are the things I've learned "
                        "while eevaluating new developers."
                    ),
                }
            )
        }
    )
    result = schema.execute(query)
    assert not result.errors
    assert result.data == expected


def test_posts_list():
    """Test a query for a list of all blog posts."""
    initialize()
    query = """{
                    posts {
                        title
                        body
                        author {
                            username
                            email
                        }
                        createdAt
                    }
                }"""
    result = schema.execute(query)
    assert not result.errors
    posts = result.data["posts"]
    assert len(posts) == 2
    assert posts[0]["title"] == "Dev skills evaluation"
    assert posts[0]["body"] == (
        "These are the things I've learned " "while eevaluating new developers."
    )
    assert posts[0]["author"]["username"] == "paul"


def test_retrieve_author():
    """Test query for a single author profile."""
    initialize()
    query = """
                query {
                    author(username: "bozho") {
                        username
                        email
                        firstName
                        lastName
                    }
                }"""
    expected = OrderedDict(
        [
            (
                "author",
                OrderedDict(
                    [
                        ("username", "bozho"),
                        ("email", "bozidar.hristov@gmail.com"),
                        ("firstName", "Bozhidar"),
                        ("lastName", "Hristov"),
                    ]
                ),
            )
        ]
    )
    result = schema.execute(query)
    assert not result.errors
    assert result.data == expected
