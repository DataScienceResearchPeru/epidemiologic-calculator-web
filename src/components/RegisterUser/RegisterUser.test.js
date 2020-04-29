import React from 'react'
import { RequestProvider } from 'react-request-hook'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import RegisterUser from './RegisterUser'
import axiosInstance from '../../middleware/api'

describe('<RegisterUser />', () => {
  afterEach(cleanup)

  test('it should mount', () => {
    const { getByTestId } = render(<RequestProvider value={axiosInstance}><RegisterUser /></RequestProvider>)
    const registerUser = getByTestId('RegisterUser')

    expect(registerUser).toBeInTheDocument()
  })
})
