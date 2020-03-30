import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import LineAreaGraphic from './LineAreaGraphic'

describe('<LineAreaGraphic />', () => {
  afterEach(cleanup)

  test('it should mount', () => {
    const { getByTestId } = render(<LineAreaGraphic />)
    const lineAreaGraphic = getByTestId('LineAreaGraphic')

    expect(lineAreaGraphic).toBeInTheDocument()
  })
})
