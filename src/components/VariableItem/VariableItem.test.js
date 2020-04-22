import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VariableItem from './VariableItem';

describe('<VariableItem />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<VariableItem />);
    const variableItem = getByTestId('VariableItem');

    expect(variableItem).toBeInTheDocument();
  });
});