import React from 'react'
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
        <SubmitFormButton
          type="submit"
          value="Submit"
          onSubmit={() => console.log('ON SUBMIT')}
          onClick={mutation}
          size={33}
        />
        <ClearFormButton onClick={() => clearState()} color="red" size={33} />
      </InputForm>
    </div>
  )
}

export default PostForm
