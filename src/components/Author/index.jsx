import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Box, Heading } from 'rebass'
import { MaxWiddthBox } from '../common/Utilities'
import PostCard from '../PostCard'

const AUTHOR_QUERY = gql`
  query Author($username: String) {
    author(username: $username) {
      username
      email
      firstName
      lastName
      postSet {
        title
        body
        slug
        createdAt
        author {
          username
        }
      }
    }
  }
`

const AuthorPosts = ({ posts }) => posts.map(post => <PostCard key={post.id} data={post} />)

const AuthorContainer = ({ author }) => {
  // const formatedDateTime = formatDatetime(createdAt)
  return (
    <MaxWiddthBox my={3}>
      <Box my={3}>
        <Heading>Posts by {`${author.firstName} ${author.lastName} - ${author.username}`}</Heading>
      </Box>
      <Box my={4} mx={2}>
        <AuthorPosts posts={author.postSet} />
      </Box>
    </MaxWiddthBox>
  )
}

class AuthorPage extends Component {
  render() {
    const { username } = this.props.match.params
    return (
      <div>
        <Query query={AUTHOR_QUERY} variables={{ username }}>
          {({ loading, data, error }) => {
            if (loading) return <div>Loading...</div>
            if (error) return `Error... ${error}`
            if (data) return <AuthorContainer {...data} />
          }}
        </Query>
      </div>
    )
  }
}

export default AuthorPage
