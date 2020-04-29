import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import VariableItem from './VariableItem'

describe('<VariableItem />', () => {
  afterEach(cleanup)

  test('it should mount', () => {
    const handleChangeValueVar = (val) => { console.log(val) }
    const { getByTestId } = render(
      <VariableItem
        title='title'
        valueInitial={0}
        descriptionLabel='description'
        handleChangeValues={handleChangeValueVar}
        descriptionTooltip='help'
      />
    )
    const variableItem = getByTestId('VariableItem')

    expect(variableItem).toBeInTheDocument()
  })
})
