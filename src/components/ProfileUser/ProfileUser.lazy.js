import React, { lazy, Suspense } from 'react'

const LazyProfileUser = lazy(() => import('./ProfileUser'))

const ProfileUser = props => (
  <Suspense fallback={null}>
    <LazyProfileUser {...props} />
  </Suspense>
)

export default ProfileUser
