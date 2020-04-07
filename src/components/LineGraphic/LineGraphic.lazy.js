import React, { lazy, Suspense } from 'react';

const LazyLineGraphic = lazy(() => import('./LineGraphic'));

const LineGraphic = props => (
  <Suspense fallback={null}>
    <LazyLineGraphic {...props} />
  </Suspense>
);

export default LineGraphic;
