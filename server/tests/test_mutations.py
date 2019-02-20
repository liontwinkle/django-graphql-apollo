"""Test GraphQL Mutations."""

import pytest
from collections import OrderedDict

from uplifty.data import initialize
from uplifty.schema import schema
from uplifty.models import Post

# from uplifty.models import Post, User

pytestmark = pytest.mark.django_db


def test_add_post():
    """Test mutation for creation of new post."""
    initialize()
    query = """
                mutation {
                    addPost(
                            author: "bozho",
                            title: "Generative Music With Magenta Tensorflow",
                            body: "Here's how I user Tensorflow to generate music"
                        ) {
                        success
                        title
                        body
                    }
                }"""
    expected = OrderedDict(
        [
            (
                "addPost",
                OrderedDict(
                    [
                        ("success", True),
                        ("title", "Generative Music With Magenta Tensorflow"),
                        ("body", "Here's how I user Tensorflow to generate music"),
                    ]
                ),
            )
        ]
    )
    result = schema.execute(query)
    assert not result.errors
    assert result.data == expected


def test_edit_post():
    """Test mutation for modifying a post."""
    initialize()
    post = Post.objects.first()
    post_id = post.id
    title = "New Post Title"
    body = "New Post Body"
    query = """
                mutation {{
                    editPost(id: "{0}", title: "{1}", body: "{2}") {{
                        success
                        title
                        body
                    }}
                }}""".format(
        post_id, title, body
    )
    result = schema.execute(query)
    assert not result.errors
    data = result.data
    assert data["editPost"]["title"] == title
    assert data["editPost"]["body"] == body


def test_delete_post():
    """Test mutation for deletion of a post."""
    initialize()
    post = Post.objects.first()
    post_id = post.id
    query = """
                mutation {{
                    deletePost(id: "{}") {{
                        success
                    }}
                }}""".format(
        post_id
    )
    result = schema.execute(query)
    assert not result.errors
    assert result.data["deletePost"]["success"]
    assert Post.objects.filter(id=post_id).count() == 0
