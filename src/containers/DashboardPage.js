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
        <LineAreaGraphic 
          width={800}
          height={400}
          margin={{
            top: 50,
            left: 50,
            right: 50,
            bottom: 50
          }}
        />
      </Container>
      <Footer />
    </React.Fragment>
  )
}

export default DashboardPage
