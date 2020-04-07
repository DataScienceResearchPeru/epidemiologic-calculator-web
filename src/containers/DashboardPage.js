import React, { useContext } from 'react'
import { StateContext } from '../contexts'

import { makeStyles, Box, Container, Grid, Link } from '@material-ui/core'

import Header from '../components/Header/Header'
import NavBar from '../components/NavBar/NavBar'
import LineAreaGraphic from '../components/LineGraphic/LineGraphic'
import Footer from '../components/Footer/Footer'

const dashboardclasses = makeStyles((theme) => ({
  dashboard: {
    display: 'flex',
  },
  boxContent: {
    borderRadius: 17,
    // backgroundColor: '#5ad6d6',
    padding: '80px 100px',
    minHeight: '14em',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  },
  boxInfo: {
    color: '#FFF',
    width: 380,
    '& h1': {
      fontSize: '1.8em',
      fontWeight: 500,
    }
  },
  boxRight: {
    backgroundColor: '#FFF',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 17,
    padding: '30px 30px 100%',
  },
  boxForm: {
    maxWidth: 380,
  },
}))

const DashboardPage = () => {
  const { state, dispatch } = useContext(StateContext)
  const classes = dashboardclasses()

  return (
    <React.Fragment>
      <Container component="main" maxWidth="lg">
        
        <Header />
        
        <Box className={classes.boxContent}> 
          <Grid container>
            <Grid item xs={6}>
              <NavBar />
            </Grid>
            <Grid item xs={6}>
              <div className={classes.boxRight}>
                <div className={classes.btnTop}>
                  {/* <Link href={'/register'} className={classes.btnLeft}>Regístrate</Link>
                  <Link href={'/'} className={classes.btnRight}>iniciar sesión</Link> */}
                </div>

                <div className={classes.boxForm}>
                  {/* <Login />
                  <Divider className={classes.hr} />
                  <div className={classes.circle}></div>

                  <div className={classes.socialMedia}>
                    <Button variant="outlined"><GoogleIcon /></Button>
                    <Button variant="outlined"><FacebookIcon /></Button>
                    <Button variant="outlined"><LinkedinIcon /></Button>
                  </div> */}
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
        {/* <NavBar></NavBar> */}
        {/* <LineAreaGraphic></LineAreaGraphic> */}
      </Container>
      <Footer />
    </React.Fragment>
  )
}

export default DashboardPage
