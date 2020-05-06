import React from 'react'
import { RequestProvider } from 'react-request-hook'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ProfileUser from './ProfileUser'
import axiosInstance from '../../middleware/api'

describe('<Profile />', () => {
  afterEach(cleanup)

  test('it should mount', () => {
    const { getByTestId } = render(<RequestProvider value={axiosInstance}><ProfileUser /></RequestProvider>)
    const profile = getByTestId('ProfileUser')

    expect(profile).toBeInTheDocument()
  })
})
