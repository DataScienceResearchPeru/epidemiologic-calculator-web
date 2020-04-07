import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Login from './Login'

describe('<Login />', () => {
  afterEach(cleanup)

  test('it should mount', () => {
    const { getByTestId } = render(<Login />)
    const login = getByTestId('Login')

    expect(login).toBeInTheDocument()
  })
})
