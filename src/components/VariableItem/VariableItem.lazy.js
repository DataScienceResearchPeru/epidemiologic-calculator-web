import React, { lazy, Suspense } from 'react';

const LazyVariableItem = lazy(() => import('./VariableItem'));

const VariableItem = props => (
  <Suspense fallback={null}>
    <LazyVariableItem {...props} />
  </Suspense>
);

export default VariableItem;
