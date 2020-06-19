import React from 'react'
import { Box, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import NavBar from '../components/NavBar/NavBar'

const useStyles = makeStyles((theme) => ({
  sectionContent: {
    borderRadius: 16,
    backgroundColor: '#FFF',
    padding: '33px 67px',
    boxShadow: '0px 2px 10px #00000029',
    zIndex: 2,
    marginLeft: -11
  },
  sectionContainer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
    boxSizing: 'border-box'
  },
  information: {
    textAlign: 'left',
    color: '#404040',
    fontSize: '14px',
    fontWeight: 320,
    marginBottom: 31
  }
}))

const DashboardPage = () => {
  const classes = useStyles()

  return (
    <>
      <Container component='main' maxWidth='lg'>
        <Header />
        <div className={classes.sectionContainer}>
          <NavBar />
          <Box className={classes.sectionContent}>
            <div className={classes.information}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </div>
          </Box>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default DashboardPage
