/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Heading, Box, Text } from 'rebass'
import { Link } from 'react-router-dom'
import { MaxWiddthBox, formatDatetime } from '../common/Utilities'

const POST_QUERY = gql`
  query Post($slug: String!) {
    post(slug: $slug) {
      id
      title
      body
      slug
      author {
        username
      }
      createdAt
    }
  }
`

const BlogContainer = ({
  data: {
    post: { author, title, body, createdAt },
  },
}) => {
  const formatedDateTime = formatDatetime(createdAt)
  return (
    <MaxWiddthBox my={3}>
      <Box my={3}>
        <Heading>{title}</Heading>
      </Box>
      <Box my={2}>
        Author: <Link to={`/author/${author.username}`}>{author.username}</Link>
        {'  '}Created at: {formatedDateTime}
      </Box>
      <Box my={3}>
        <Text>{body}</Text>
      </Box>
    </MaxWiddthBox>
  )
}

class BlogPost extends Component {
  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { slug } = this.props.match.params
    return (
      <div>
        <Query query={POST_QUERY} variables={{ slug }}>
          {({ loading, data, error }) => {
            if (loading) return <div>Loading...</div>
            if (error) return `Error... ${error}`
            return <BlogContainer data={data} />
          }}
        </Query>
      </div>
    )
  }
}

BlogContainer.propTypes = {
  data: PropTypes.shape({
    author: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    id: PropTypes.string,
    slug: PropTypes.string,
  }).isRequired,
}

export default BlogPost
