import React from 'react'
import { RequestProvider } from 'react-request-hook'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Login from './Login'
import axiosInstance from '../../middleware/api'

describe('<Login />', () => {
  afterEach(cleanup)

  test('it should mount', () => {
    const { getByTestId } = render(<RequestProvider value={axiosInstance}><Login /></RequestProvider>)
    const login = getByTestId('Login')

    expect(login).toBeInTheDocument()
  })
})
