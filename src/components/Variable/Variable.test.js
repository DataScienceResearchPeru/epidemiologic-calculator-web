import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Variable from './Variable'

describe('<Variable />', () => {
  afterEach(cleanup)

  test('it should mount', () => {
    const { getByTestId } = render(<Variable />)
    const variable = getByTestId('Variable')

    expect(variable).toBeInTheDocument()
  })
})
