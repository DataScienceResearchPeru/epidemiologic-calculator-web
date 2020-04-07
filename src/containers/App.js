import React, { useReducer } from 'react'
import { Router, View } from 'react-navi'
import { mount, route } from 'navi'

import Login from '../components/Login/Login'
import DashboardPage from '../containers/DashboardPage'
import RegisterUser from '../components/RegisterUser/RegisterUser'
import appReducer from '../reducers'
import { StateContext } from '../contexts'

const routes = mount({
  '/': route({ view: <Login /> }),
  '/dashboard': route({view: <DashboardPage />}),
  '/register': route({view: <RegisterUser />}),
})

function App () {
  const [ state, dispatch ] = useReducer(appReducer, { user: ''})
  const { user } = state

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <Router routes={routes} context={{user}}> 
        <View />
      </Router>
    </StateContext.Provider>
  )
}

export default App
