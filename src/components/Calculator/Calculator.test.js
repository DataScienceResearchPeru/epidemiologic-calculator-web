import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Calculator from './Calculator';

describe('<Calculator />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<Calculator />);
    const calculator = getByTestId('Calculator');

    expect(calculator).toBeInTheDocument();
  });
});