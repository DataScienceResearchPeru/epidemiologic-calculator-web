import React, { useState } from 'react'
import { Container, Grid, Box, Divider, Link, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import FacebookIcon from '../components/icons/FacebookIcon'
import LinkedinIcon from '../components/icons/LinkedinIcon'
import GoogleIcon from '../components/icons/GoogleIcon'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import Login from '../components/Login/Login'
import RegisterUser from '../components/RegisterUser/RegisterUser'
import background from '../images/background.svg'

const useStyles = makeStyles((theme) => ({
  boxContent: {
    borderRadius: 17,
    backgroundColor: '#33CCCC',
    padding: '80px 100px',
    fontFamily: '"Raleway","Roboto", "Helvetica", "Arial", sans-serif',
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  boxInfo: {
    color: '#FFF',
    width: 389,
    '& h1': {
      fontSize: '25px',
      fontWeight: 'bold',
      marginBottom: '0.8em'
    },
    '& p': {
      fontSize: 16,
      fontWeight: 350
    }
  },
  boxRight: {
    backgroundColor: '#FFF',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 17,
    padding: '30px 27px 50px',
    boxShadow: '0px 2px 10px #00000033',
    opacity: 1
  },
  boxForm: {
    maxWidth: 385,
  },
  btnTop: {
    textTransform: 'uppercase',
    fontSize: 12,
    marginBottom: 50,
    '& a': {
      display: 'inline-block',
      fontWeight: 600,
      borderRadius: 15,
      padding: '7px 27px',
    }
  },
  btnLeft:{
    border: '1px solid #ebebeb',
    backgroundColor: '#ebebeb',
    color: '#33CCCC',
    minWidth: 100,
    borderRadius: '15px 0 0 15px !important'
  },
  btnRight: {
    border: '1px solid #33CCCC',
    backgroundColor: '#33CCCC',
    color: '#FFF',
    marginLeft: -13,
    boxShadow: '0px 2px 4px #00000029',
    WebkitBoxShadow: '0px 2px 4px #00000029',
  },
  hr: {
    border: '1px solid #33CCCC',
    width: '100%',
    height: 0,
  },
  circle: {
    height: 10,
    width: 10,
    backgroundColor: '#33CCCC',
    borderRadius: '100%',
    boxShadow: 'inset 0px 0px 0px 2px #FFF',
    border: '10px solid #33CCCC',
    display: 'inline-block',
    marginTop: -15,
    marginBottom: 21,
  },
  socialMedia:{
    '& > *': {
      margin: theme.spacing(1.5),
    },
    '& .MuiIconButton-root': {
      color: '#545353',
      border: '1px solid #e2e1e1',
      padding: 6,
      boxShadow: '0px 2px 4px #00000029'
    }
  },
}))
  
const HomePage = () => {
  const classes = useStyles()
  const [ showLogin, setShowLogin ] = useState(true)
  let form

  if (showLogin) {
    form = <Login />
  } else {
    form = <RegisterUser />
  }

  const handleClickShowLogin = () => {
    setShowLogin(true)
  }

  const handleClickShowRegister = () => {
    setShowLogin(false)
  }
  
  return (
    <React.Fragment>
      <Container component="main" maxWidth="lg">
        <Header />
        <Box className={classes.boxContent}> 
          <Grid container>
            <Grid item xs={6}>
              <div className={classes.boxInfo}>
                <h1>BIENVENIDO</h1>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est. 
                </p>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.boxRight}>
                <div className={classes.btnTop}>
                  <Link href="#" onClick={handleClickShowRegister} underline="none" className={classes.btnLeft}>Regístrate</Link>
                  <Link href="#" onClick={handleClickShowLogin} underline="none" className={classes.btnRight}>Iniciar sesión</Link>
                </div>

                <div className={classes.boxForm}>
                  { form }
                  
                  <Divider className={classes.hr} />
                  <div className={classes.circle}></div>

                  <div className={classes.socialMedia}>
                    <IconButton color="default" aria-label="google">
                      <GoogleIcon />
                    </IconButton>
                    <IconButton color="default" aria-label="facebook">
                      <FacebookIcon />
                    </IconButton>
                    <IconButton color="default" aria-label="linkedin">
                      <LinkedinIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </React.Fragment>
  )
}

HomePage.propTypes = {}

HomePage.defaultProps = {}

export default HomePage
