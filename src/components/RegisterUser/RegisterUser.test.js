import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RegisterUser from './RegisterUser';

describe('<RegisterUser />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<RegisterUser />);
    const registerUser = getByTestId('RegisterUser');

    expect(registerUser).toBeInTheDocument();
  });
});