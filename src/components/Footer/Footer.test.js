import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from './Footer';

describe('<Footer />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<Footer />);
    const footer = getByTestId('Footer');

    expect(footer).toBeInTheDocument();
  });
});