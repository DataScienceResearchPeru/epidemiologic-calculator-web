import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AppIcon from './AppIcon'

describe('<AppIcon />', () => {
  afterEach(cleanup)

  test('it should mount', () => {
    const { getByTestId } = render(<AppIcon />)
    const appIcon = getByTestId('AppIcon')

    expect(appIcon).toBeInTheDocument()
  })
})
