import React, { lazy, Suspense } from 'react';

const LazyRegisterUser = lazy(() => import('./RegisterUser'));

const RegisterUser = props => (
  <Suspense fallback={null}>
    <LazyRegisterUser {...props} />
  </Suspense>
);

export default RegisterUser;
