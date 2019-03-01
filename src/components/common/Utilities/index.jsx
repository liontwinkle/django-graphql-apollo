import styled from 'styled-components'
import { Box } from 'rebass'

export const MaxWiddthBox = styled(Box)`
  max-width: 800px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  .centered-text {
    text-align: center;
  }
`

export const formatDatetime = createdAt => {
  const dateTime = new Date(createdAt)
  const formatedDateTime = dateTime.toLocaleString()
  return formatedDateTime
}
