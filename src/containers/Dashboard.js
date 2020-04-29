import React from 'react'
import { Container, Grid, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Header from '../components/Header/Header'
import NavBar from '../components/NavBar/NavBar'

const useStyles = makeStyles((theme) => ({
  boxContent: {
    borderRadius: 17,
    padding: '80px 100px'
  }
}))

const Dashboard = () => {
  const classes = useStyles()
  return (
    <>
      <Container component='main' maxWidth='lg'>
        <Header />
        <Box className={classes.boxContent}>
          <Grid container>
            <NavBar />
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default Dashboard
