import React, { useReducer, Suspense } from 'react'
import { NotFoundBoundary, Router, View } from 'react-navi'

import appReducer from '../reducers'
import { StateContext } from '../contexts'
import routes from '../routes'

function App () {
  const [state, dispatch] = useReducer(appReducer, { user: '', register: '' })
  const { user } = state

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <Router routes={routes} context={{ user }}>
        <Suspense fallback={null}>
          <NotFoundBoundary render={() => <h1>Not Found</h1>}>
            <View />
          </NotFoundBoundary>
        </Suspense>
      </Router>
    </StateContext.Provider>
  )
}

export default App
