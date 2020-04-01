import React, { lazy, Suspense } from 'react';

const LazyNavBar = lazy(() => import('./NavBar'));

const NavBar = props => (
  <Suspense fallback={null}>
    <LazyNavBar {...props} />
  </Suspense>
);

export default NavBar;
