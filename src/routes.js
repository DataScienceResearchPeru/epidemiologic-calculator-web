import React from 'react'
import {map, mount, redirect, route} from 'navi'

import HomePage from './containers/HomePage'
import DashboardPage from './containers/DashboardPage'
import CalculatorPage from './containers/CalculatorPage'
import StatisticsPage from './containers/StatisticsPage'
import ComparativePage from './containers/ComparativePage'
import UnconfirmedAccount from './components/UnconfirmedAccount/UnconfirmedAccount'
import VerifyAccount from './components/VerifyAccount/VerifyAccount'
import ResetPassword from './components/ResetPassword/ResetPassword'
import ProfileUser from './components/ProfileUser/ProfileUser'

const routes = mount({
  '/': route({ view: <HomePage /> }),
  '/dashboard': map(async (request, context) => {
    if(!context.token) return redirect('/') //TODO validar que el token no haya expirado contra el backend
    return route({ view: <DashboardPage /> })
  }),
  '/profile': map(async (request, context) => {
    if(!context.token) return redirect('/')
    return route({ view: <ProfileUser /> })
  }),
  '/calculator': map(async (request, context) => {
    if(!context.token) return redirect('/')
    return route({ view: <CalculatorPage /> })
  }),
  '/statistics': map(async (request, context) => {
    if(!context.token) return redirect('/')
    return route({ view: <StatisticsPage /> })
  }),
  '/comparative': map(async (request, context) => {
    if(!context.token) return redirect('/')
    return route({ view: <ComparativePage /> })
  }),
  '/unconfirmed_account': route({ view: <UnconfirmedAccount /> }),
  '/verify_account/:token': route(async req => {
    const token = req.params.token
    return {
      view: <VerifyAccount token={token} />
    }
  }),
  '/reset-password/:token': route(async req => {
    const token = req.params.token
    return {
      view: <ResetPassword token={token} />
    }
  })
})

export default routes
