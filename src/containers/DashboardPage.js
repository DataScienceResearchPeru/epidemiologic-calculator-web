import React from 'react'
import { Container } from '@material-ui/core'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import LineAreaGraphic from '../components/LineGraphic/LineGraphic'


const DashboardPage = () => {
  return (
    <React.Fragment>
      <Container component="main" maxWidth="lg">
        <Header />
        <LineAreaGraphic></LineAreaGraphic>
      </Container>
      <Footer />
    </React.Fragment>
  )
}

export default DashboardPage
