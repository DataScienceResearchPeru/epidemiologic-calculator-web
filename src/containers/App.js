import React, { useReducer, Suspense } from 'react'
import { NotFoundBoundary, Router, View } from 'react-navi'
import { ThemeProvider } from '@material-ui/core/styles'

import appReducer from '../reducers'
import { StateContext } from '../contexts'
import routes from '../routes'
import useLocalStorage from '../hooks/local-storage'
import theme from '../theme'

function App () {
  const [tokenStorage] = useLocalStorage('token', null)
  const [state, dispatch] = useReducer(appReducer, { user: '', register: '', token: tokenStorage })
  const { user, token } = state

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <Router routes={routes} context={{ user, token }}>
        <Suspense fallback={null}>
          <NotFoundBoundary render={() => <h1>Not Found</h1>}>
            <ThemeProvider theme={theme}>
              <View />
            </ThemeProvider>
          </NotFoundBoundary>
        </Suspense>
      </Router>
    </StateContext.Provider>
  )
}

export default App
