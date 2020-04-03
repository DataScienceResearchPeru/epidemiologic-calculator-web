import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LineGraphic from './LineGraphic';

describe('<LineGraphic />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<LineGraphic />);
    const lineGraphic = getByTestId('LineGraphic');

    expect(lineGraphic).toBeInTheDocument();
  });
});