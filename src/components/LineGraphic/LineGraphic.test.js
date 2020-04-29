import React from 'react'
import { RequestProvider } from 'react-request-hook'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import LineGraphic from './LineGraphic'
import axiosInstance from '../../middleware/api'

describe('<LineGraphic />', () => {
  afterEach(cleanup)

  test('it should mount', () => {
    const { getByTestId } = render(<RequestProvider value={axiosInstance}><LineGraphic data={{ susceptible: [32000000.0], time: [0] }} /></RequestProvider>)
    const lineGraphic = getByTestId('LineGraphic')

    expect(lineGraphic).toBeInTheDocument()
  })
})
