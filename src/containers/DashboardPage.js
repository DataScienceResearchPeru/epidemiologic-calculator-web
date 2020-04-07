import React, { useContext } from 'react'
import { StateContext } from '../contexts'

import { makeStyles, Box } from '@material-ui/core'

import Header from '../components/Header/Header'
import NavBar from '../components/NavBar/NavBar'
import LineAreaGraphic from '../components/LineGraphic/LineGraphic'

const dashboardclasses = makeStyles((theme) => ({
  dashboard: {
    display: 'flex',
  },
  boxStyle: {
    zIndex: theme.zIndex.drawer + 1,
  },
}))

const DashboardPage = () => {
  const { state, dispatch } = useContext(StateContext)
  const classes = dashboardclasses()

  return (
    <React.Fragment>
      <Header></Header>
      
      <NavBar></NavBar>
      {/* <LineAreaGraphic></LineAreaGraphic> */}
      
    </React.Fragment>
  )
}

export default DashboardPage
