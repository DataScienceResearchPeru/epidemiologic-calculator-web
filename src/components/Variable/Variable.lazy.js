import React, { lazy, Suspense } from 'react';

const LazyVariable = lazy(() => import('./Variable'));

const Variable = props => (
  <Suspense fallback={null}>
    <LazyVariable {...props} />
  </Suspense>
);

export default Variable;
