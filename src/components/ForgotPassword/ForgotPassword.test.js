import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ForgotPassword from './ForgotPassoword'

describe('<ForgotPassword />', () => {
  afterEach(cleanup)

  test('it should mount', () => {
    const { getByTestId } = render(<ForgotPassword />)
    const login = getByTestId('ForgotPassword')

    expect(login).toBeInTheDocument()
  })
})
