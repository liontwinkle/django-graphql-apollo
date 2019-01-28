import React from 'react'
import TestRenderer from 'react-test-renderer'
import Button from '.'

describe('Button', () => {
  it('should match snapshot', () => {
    const renderer = TestRenderer.create(<Button />)

    expect(renderer.toJSON()).toMatchSnapshot()
  })
})
