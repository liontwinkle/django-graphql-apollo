import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
import { Heading, Box, Flex } from 'rebass'
import { GoDiffAdded, GoIssueOpened, GoIssueClosed } from 'react-icons/go'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import PostCard from '../PostCard'
import PostForm from '../PostForm'

export const POSTS_QUERY = gql`
  {
    posts {
      id
      createdAt
      title
      body
      slug
      author {
        username
        email
      }
    }
  }
`

const ADD_POST_MUTATION = gql`
  mutation AddPost($author: String, $title: String, $body: String) {
    addPost(author: $author, body: $body, title: $title) {
      success
      id
      title
      body
      createdAt
    }
  }
`

const StyledPlus = styled(GoDiffAdded)`
  cursor: pointer;
`

class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = { author: '', title: '', body: '' }
  }

  handleInputChange = event => {
    const { value, name } = event.target
    this.setState({
      [name]: value,
    })
  }

  clearState = () => {
    this.setState({ author: '', title: '', body: '' })
  }

  render() {
    const { author, title, body } = this.state
    return (
      <div>
        <Flex m={3} flexDirection="column" justifyContent="center">
          <Heading fontSize={5} textAlign="center">
            Welcome To Our Blog
          </Heading>

          <Box ml={2}>
            {/* OnCompleted Bug prevents from elegantly handling success
              https://github.com/apollographql/react-apollo/issues/2522 */}
            <Mutation
              refetchQueries={() => {
                return [{ query: POSTS_QUERY }]
              }}
              mutation={ADD_POST_MUTATION}
              variables={{ author, title, body }}
              awaitRefetchQueries
            >
              {(addPostMutation, { data, error }) => (
                <div>
                  <Popup
                    contentStyle={{ width: '75%' }}
                    modal
                    closeOnDocumentClick
                    trigger={<StyledPlus size={30} />}
                  >
                    <Heading>Create a new blog post</Heading>
                    {error ? (
                      <Box>
                        <GoIssueOpened color="red" size={28} />
                        <Heading>Error in creating new blog post:</Heading>
                        <div>{`${error}`}</div>
                      </Box>
                    ) : null}

                    {data && data.addPost.success && (
                      <Box m={2}>
                        <GoIssueClosed color="green" size={28} />
                        Successfully created new post.
                      </Box>
                    )}
                    <Box>
                      <PostForm
                        author={author}
                        title={title}
                        body={body}
                        mutation={addPostMutation}
                        handleInputChange={this.handleInputChange}
                        clearState={this.clearState}
                      />
                    </Box>
                  </Popup>
                  <Box my={2}>Add a new post</Box>
                </div>
              )}
            </Mutation>
          </Box>
        </Flex>
        <Box m={3} mt={5}>
          <Box my={3}>
            <Heading textAlign="center">All posts</Heading>
          </Box>
          <Query query={POSTS_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>
              if (error) return <div>Error</div>
              return data.posts.map(post => (
                <PostCard
                  key={post.id}
                  clearState={this.clearState}
                  handleInputChange={this.handleInputChange}
                  data={post}
                />
              ))
            }}
          </Query>
        </Box>
      </div>
    )
  }
}

export default PostList
