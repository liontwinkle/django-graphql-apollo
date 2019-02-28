import React, { Component } from 'react'
import styled from 'styled-components'
import { Flex, Box, Heading, Text } from 'rebass'
import { Link } from 'react-router-dom'
import { GoX, GoPencil, GoIssueOpened, GoIssueClosed } from 'react-icons/go'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Popup from 'reactjs-popup'
import { POSTS_QUERY } from '../PostList'
import PostForm from '../PostForm'
import { formatDatetime } from '../common/Utilities'

const DELETE_MUTATION = gql`
  mutation DeletePost($id: UUID) {
    deletePost(id: $id) {
      success
    }
  }
`

const EDIT_MUTATION = gql`
  mutation EditPost($body: String, $title: String, $id: UUID) {
    editPost(body: $body, title: $title, id: $id) {
      success
      id
      title
      body
      createdAt
      slug
      author {
        username
        email
      }
    }
  }
`

const IconsContainer = styled(Flex)`
  svg {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    cursor: pointer;
  }
  .delete-button {
    color: red;
  }
`

class PostCard extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.data
  }

  handleInputChange(event) {
    const { value, name } = event.target
    this.setState({
      [name]: value,
    })
  }

  clearState() {
    this.setState({ author: '', title: '', body: '' })
  }

  render() {
    const { createdAt, title, body, author, slug, id } = this.state
    const { username } = author
    const formatedDateTime = formatDatetime(createdAt)
    return (
      <Flex mx={2}>
        <Box m={2} width={1 / 3}>
          <Flex flexDirection="column">
            <Box mb={2}>{formatedDateTime}</Box>
            <Link to={`/author/${username}`}>
              <Box>{username}</Box>
            </Link>
          </Flex>
        </Box>
        <Box m={2} width={2 / 3}>
          <Link to={`blog/${slug}`}>
            <Heading fontSize={3} mb={2}>
              {title}
            </Heading>
          </Link>
          <IconsContainer>
            <Mutation
              refetchQueries={() => {
                return [{ query: POSTS_QUERY }]
              }}
              mutation={DELETE_MUTATION}
              variables={{ id }}
            >
              {deleteMutation => <GoX className="delete-button" m={2} onClick={deleteMutation} />}
            </Mutation>
            <Mutation
              refetchQueries={() => {
                return [{ query: POSTS_QUERY }]
              }}
              mutation={EDIT_MUTATION}
              variables={{ id, title, body }}
            >
              {(editMutation, { data, loading, error }) => (
                <Box>
                  {/* {console.log('Loading: ', loading)}
                  {console.log('Error: ', error)} */}

                  <Box>
                    <Popup
                      contentStyle={{ width: '75%' }}
                      modal
                      closeOnDocumentClick
                      trigger={<GoPencil m={2} />}
                    >
                      <Box>
                        <Heading>Modify blog post</Heading>
                        <Box>
                          {error ? (
                            <Box m={2}>
                              <GoIssueOpened color="red" size={28} />
                              <Heading>Error in creating new blog post:</Heading>
                              <div>{`${error}`}</div>
                            </Box>
                          ) : null}
                          {data && data.editPost.success && (
                            <Box m={2}>
                              <GoIssueClosed color="green" size={28} />
                              Successfully updated post.
                            </Box>
                          )}
                        </Box>
                        <PostForm
                          author={username}
                          title={title}
                          body={body}
                          mutation={editMutation}
                          handleInputChange={this.handleInputChange.bind(this)}
                          clearState={this.clearState.bind(this)}
                        />
                      </Box>
                    </Popup>
                  </Box>
                </Box>
              )}
            </Mutation>
          </IconsContainer>
          <Text>{body}</Text>
        </Box>
      </Flex>
    )
  }
}

export default PostCard
