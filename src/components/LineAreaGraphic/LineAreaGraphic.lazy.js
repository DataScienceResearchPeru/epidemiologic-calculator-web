import React, { lazy, Suspense } from 'react';

const LazyLineAreaGraphic = lazy(() => import('./LineAreaGraphic'));

const LineAreaGraphic = props => (
  <Suspense fallback={null}>
    <LazyLineAreaGraphic {...props} />
  </Suspense>
);

export default LineAreaGraphic;
