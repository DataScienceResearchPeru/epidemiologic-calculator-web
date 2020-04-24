import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NavBar from './NavBar'

describe('<NavBar />', () => {
  afterEach(cleanup)

  test('it should mount', () => {
    const { getByTestId } = render(<NavBar />)
    const navBar = getByTestId('NavBar')

    expect(navBar).toBeInTheDocument()
  })
})
