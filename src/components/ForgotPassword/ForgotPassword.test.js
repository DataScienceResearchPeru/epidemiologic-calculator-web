import React from 'react'
import { RequestProvider } from 'react-request-hook'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ForgotPassword from './ForgotPassoword'
import axiosInstance from '../../middleware/api'

describe('<ForgotPassword />', () => {
  afterEach(cleanup)

  test('it should mount', () => {
    const { getByTestId } = render(<RequestProvider value={axiosInstance}><ForgotPassword /></RequestProvider>)
    const login = getByTestId('ForgotPassword')

    expect(login).toBeInTheDocument()
  })
})
