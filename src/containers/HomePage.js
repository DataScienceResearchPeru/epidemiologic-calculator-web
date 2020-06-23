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
import DialogContainer from './DialogContainer'
import ForgotPassword from '../components/ForgotPassword/ForgotPassword'

const useStyles = makeStyles((theme) => ({
  boxContent: {
    borderRadius: 17,
    padding: '80px 100px',
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  boxInfo: {
    color: '#FFF',
    maxWidth: 389,
    '& h1': {
      fontSize: '25px',
      fontWeight: 'bold',
      marginBottom: '0.8em'
    },
    '& p': {
      fontSize: 16,
      fontWeight: 350,
      textAlign: 'justify'
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
    maxWidth: 385
  },
  btnTop: {
    textTransform: 'uppercase',
    fontSize: 12,
    marginBottom: 50,
    '& a': {
      display: 'inline-block',
      fontWeight: 600,
      padding: '7px 27px',
      position: 'relative'
    },
    '& a.btnleft': {
      border: '1px solid #ebebeb',
      backgroundColor: '#ebebeb',
      color: '#33CCCC',
      minWidth: 100,
      borderRadius: '15px 0 0 15px'
    },
    '& .btnright.active, .btnleft.active': {
      backgroundColor: '#33CCCC',
      border: '1px solid #33CCCC',
      color: '#FFF',
      zIndex: 999,
      boxShadow: '0px 2px 4px #00000029',
      WebkitBoxShadow: '0px 2px 4px #00000029',
      borderRadius: 15,
      transition: 'all 0.15s ease-in'
    },
    '& a.btnright': {
      border: '1px solid #ebebeb',
      backgroundColor: '#ebebeb',
      color: '#33CCCC',
      marginLeft: -13,
      borderRadius: '0 15px 15px 0'
    }
  },
  hr: {
    border: '1px solid #33CCCC',
    width: '100%',
    height: 0
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
    marginBottom: 21
  },
  socialMedia: {
    '& > *': {
      margin: theme.spacing(1.5)
    },
    '& .MuiIconButton-root': {
      color: '#545353',
      border: '1px solid #e2e1e1',
      padding: 6,
      boxShadow: '0px 2px 4px #00000029'
    }
  }
}))

const HomePage = () => {
  const classes = useStyles()
  const [showLogin, setShowLogin] = useState(true)
  let form

  const [open, setOpen] = React.useState(false)

  const showDialogoForgotPassword = () => {
    setOpen(true)
  }

  if (showLogin) {
    form = <Login handleForgotPassword={showDialogoForgotPassword} />
  } else {
    form = <RegisterUser />
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickShowLogin = () => {
    setShowLogin(true)
  }

  const handleClickShowRegister = () => {
    setShowLogin(false)
  }

  return (
    <>
      <Container component='main' maxWidth='lg'>
        <Header />
        <Box className={classes.boxContent}>
          <Grid container>
            <Grid item xs={12} sm={4} md={6}>
              <div className={classes.boxInfo}>
                <h1>BIENVENIDO</h1>
                <p>
                  Una herramienta segura y ágil para registrar los datos de su hospital, distrito, comunidad o región estado de sus pacientes COVID-19. De esta manera los ayudaremos a predecir estadísticas en relación a la cantidad de pacientes actuales que poseen COVID-19 y la población que posee actualmente.
                </p>
                <p>
                  ¿Aún no tienes una cuenta? Regístrate
                </p>
              </div>
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
              <div className={classes.boxRight}>
                <div className={classes.btnTop}>
                  <Link href='#' onClick={handleClickShowRegister} underline='none' className={`btnleft ${!showLogin ? 'active' : ''}`}>Regístrate</Link>
                  <Link href='#' onClick={handleClickShowLogin} underline='none' className={`btnright ${showLogin ? 'active' : ''}`}>Iniciar sesión</Link>
                </div>

                <div className={classes.boxForm}>
                  {form}
                  <Divider className={classes.hr} />
                  <div className={classes.circle} />

                  <div className={classes.socialMedia}>
                    <IconButton color='default' aria-label='google'>
                      <GoogleIcon />
                    </IconButton>
                    <IconButton color='default' aria-label='facebook'>
                      <FacebookIcon />
                    </IconButton>
                    <IconButton color='default' aria-label='linkedin'>
                      <LinkedinIcon />
                    </IconButton>
                  </div>
                </div>
              </div>

              <DialogContainer isOpen={open} handler={handleClose}>
                <ForgotPassword handler={handleClose} />
              </DialogContainer>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  )
}

HomePage.propTypes = {}

HomePage.defaultProps = {}

export default HomePage
