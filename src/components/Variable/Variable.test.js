import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Variable from './Variable'

describe('<Variable />', () => {
  afterEach(cleanup)

  test('it should mount', () => {
<<<<<<< HEAD
    const { getByTestId } = render(<Variable
      title='VARIABLES DE TRANSMISIÓN'
      columns={{
        values: [
          {
            title: 'Población',
            items: [
              {
                title: 'Tamaño de la población',
                label: 'Personas',
                help: 'Ayuda',
                value: 32000000
              },
              {
                title: 'Número inicial de infectados',
                label: 'infectados',
                help: 'Ayuda',
                value: 6
              }
            ]
          }
        ]
      }}
    />)
=======
    const { getByTestId } = render(
      <Variable
        title='VARIABLES DE TRANSMISIÓN'
        columns={{
          values: [
            {
              title: 'Población',
              items: [
                {
                  title: 'Tamaño de la población',
                  label: 'Personas',
                  help: 'Ayuda',
                  value: 32000000
                },
                {
                  title: 'Número inicial de infectados',
                  label: 'infectados',
                  help: 'Ayuda',
                  value: 6
                }
              ]
            }
          ]
        }}
      />
    )
>>>>>>> 66e8a9b267447039566719d0936ac866ec56eaac
    const variable = getByTestId('Variable')

    expect(variable).toBeInTheDocument()
  })
})
