import React, { lazy, Suspense } from 'react'

const LazyAppIcon = lazy(() => import('./AppIcon'))

const AppIcon = props => (
  <Suspense fallback={null}>
    <LazyAppIcon {...props} />
  </Suspense>
)

export default AppIcon
