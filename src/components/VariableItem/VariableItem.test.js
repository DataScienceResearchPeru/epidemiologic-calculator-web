import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import VariableItem from './VariableItem'

describe('<VariableItem />', () => {
  afterEach(cleanup)

  test('it should mount', () => {
<<<<<<< HEAD
    const changeValueVar = (val) => { console.log(val) }
    const { getByTestId } = render(<VariableItem
      title='title'
      valueInitial={0}
      descriptionLabel='description'
      changeValues={changeValueVar}
      descriptionTooltip='help'
    />)
=======
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
>>>>>>> 66e8a9b267447039566719d0936ac866ec56eaac
    const variableItem = getByTestId('VariableItem')

    expect(variableItem).toBeInTheDocument()
  })
})
