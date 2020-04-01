import React, { lazy, Suspense } from 'react';

const LazyCalculator = lazy(() => import('./Calculator'));

const Calculator = props => (
  <Suspense fallback={null}>
    <LazyCalculator {...props} />
  </Suspense>
);

export default Calculator;
