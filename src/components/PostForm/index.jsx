import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'rebass'
import styled from 'styled-components'
import { GoCheck, GoX } from 'react-icons/go'

const InputForm = styled.form`
  width: 800px;
  .input {
    width: 40%;
  }
  .input-body {
    height: 300px;
  }
`
const SubmitFormButton = styled(GoCheck)`
  color: green;
  margin-left: 0.5rem;
  cursor: pointer;
`
const ClearFormButton = styled(GoX)`
  color: green;
  margin-left: 0.5rem;
  cursor: pointer;
`

const PostForm = ({ author, title, body, mutation, handleInputChange, clearState }) => {
  return (
    <div>
      <InputForm>
        <Box m={2}>
          <Box my={1}>Author:</Box>
          <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            type="text"
            name="author"
            onChange={evt => handleInputChange(evt)}
            value={author}
            className="input"
            placeholder="Author username"
          />
        </Box>
        <Box m={2}>
          <Box my={1}>Title:</Box>
          <input
            type="text"
            name="title"
            onChange={evt => handleInputChange(evt)}
            value={title}
            className="input"
            placeholder="Blog post title"
          />
        </Box>
        <Box m={2}>
          <Box my={1}>Content:</Box>
          <textarea
            type="text"
            name="body"
            onChange={evt => handleInputChange(evt)}
            value={body}
            className="input input-body"
            placeholder="Blog post body content"
          />
        </Box>
        <SubmitFormButton type="submit" value="Submit" onClick={mutation} size={33} />
        <ClearFormButton onClick={() => clearState()} color="red" size={33} />
      </InputForm>
    </div>
  )
}

PostForm.propTypes = {
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  mutation: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
}

export default PostForm
