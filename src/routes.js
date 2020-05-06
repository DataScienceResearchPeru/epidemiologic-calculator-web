import React from 'react'
import { mount, route } from 'navi'

import HomePage from './containers/HomePage'
import DashboardPage from './containers/DashboardPage'
import UnconfirmedAccount from './components/UnconfirmedAccount/UnconfirmedAccount'
import VerifyAccount from './components/VerifyAccount/VerifyAccount'
import ResetPassword from './components/ResetPassword/ResetPassword'
import ProfileUser from "./components/ProfileUser/ProfileUser";

const routes = mount({
  '/': route({ view: <HomePage /> }),
  '/dashboard': route({ view: <DashboardPage /> }),
  '/profile': route({ view: <ProfileUser /> }),
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
