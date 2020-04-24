import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UserMenu from './UserMenu'

describe('<UserMenu />', () => {
  afterEach(cleanup)

  test('it should mount', () => {
    const { getByTestId } = render(<UserMenu />)
    const userMenu = getByTestId('UserMenu')

    expect(userMenu).toBeInTheDocument()
  })
})
