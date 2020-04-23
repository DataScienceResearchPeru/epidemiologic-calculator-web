import React, { useState, useEffect } from 'react'
import { useResource } from 'react-request-hook'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Input, Button, FormControl, Grid, InputLabel } from '@material-ui/core'
import { useNavigation } from 'react-navi'

import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { api } from '../../middleware/api'
import background from '../../images/background.svg'
import useErrorApi from '../../hooks/use-error-api'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
  boxContent: {
    borderRadius: 17,
    backgroundColor: '#5ad6d6',
    padding: '80px 100px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    color: '#FFF',
    minHeight: 400,
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    '& h1': {
      fontSize: '1.8em',
      fontWeight: 500,
    },
    '& a': {
      color: '#FFF',
      fontWeight: 600
    }
  },
  form: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    fontFamily: '"Raleway","Roboto", "Helvetica", "Arial", sans-serif',
    '& .MuiInputBase-root': {
      border: '1px solid #ccc',
      borderRadius: 10,
      marginTop: 22,
      WebkitBoxShadow: '0px 1px 4px #00000033',
      boxShadow: '0px 1px 4px #00000033',
    },
    '& .MuiInputBase-input': {
      height: '2em',
      padding: '6px 8px 7px',
      '&:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 30px white inset !important',
        borderRadius: 'inherit'
      },
    },
    '& .MuiInputLabel-formControl': {
      color: '#33CCCC',
      fontWeight: 500,
      fontSize: '1.2rem'
    },
    '& .MuiCheckbox-root': {
      padding: 0,
    },
    '& .MuiFormControlLabel-root': {
      float: 'left',
      marginLeft: 0
    },
    '& .MuiTypography-body1': {
      fontSize: '0.8rem',
      color: '#a0a0a0',
      marginLeft: 4,
    }
  },
  forgotPassword: {
    fontSize: '0.8rem',
    color: '#a0a0a0',
    textDecoration: 'none',
  },
  submit: {
    margin: theme.spacing(4, 0, 2),
    backgroundColor: '#33CCCC',
    color: '#FFF',
    borderRadius: 15,
    fontSize: 12,
    padding: '6px 27px',
    minWidth: 150,
    boxShadow: '0px 2px 4px #00000029',
    lineHeight: 1.5,
    marginRight: '10px'
  },
  cancel: {
    margin: theme.spacing(4, 0, 2),
    color: '#000',
    borderRadius: 15,
    fontSize: 12,
    padding: '6px 27px',
    minWidth: 150,
    boxShadow: '0px 2px 4px #00000029',
    lineHeight: 1.5,    
  }
}))

function Alert (props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const ResetPassword = (props) => {
  const { token } = props
  const classes = useStyles() 
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [messageConfirmation, setMessageConfirmation] = useState('')
  const [openConfirmation, setConfirmation] = useState(false)

  const [ response, resetPassword ] = useResource(api.resetPassword) 
  const [stateError, AlertError, setData] = useErrorApi(response)
  const navigation = useNavigation()
  
  
  useEffect(() => {
    setData(response)
    if(response && response.data && !stateError){
      console.log('reset success')
      setConfirmation(true)
      setMessageConfirmation(response.data.message)
      setPassword('')
      setPasswordConfirm('')
    }
  }, [response])
  

  function handlePassword (e) {
    setPassword(e.target.value)
  }

  function handlePasswordConfirm (e) {
    setPasswordConfirm(e.target.value)
  }

  const formInvalid = () => {
    return ((password.length === 0) || passwordConfirm.length === 0 || password !== passwordConfirm)
  }

  const backLogin = () => {
    navigation.navigate('/')
  }

  const handlerCloseConfirmation = () => {
    setConfirmation(false)
    backLogin()
  }

  return (
    <React.Fragment>
      <Container component="main" maxWidth="md">
        <Header />
        
        <Grid container justify="center" alignItems="center">
          <Grid item xs={6} >
            
            <form className={classes.form} data-testid="ResetPassword" onSubmit={e => { e.preventDefault(); resetPassword(password, token) }}>
            
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="username" shrink>Contraseña</InputLabel>
                <Input type="password" value={password} onChange={handlePassword} autoFocus disableUnderline={true}/> 
              </FormControl> 

              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="username" shrink>Repetir Contraseña</InputLabel>
                <Input type="password" value={passwordConfirm} onChange={handlePasswordConfirm} disableUnderline={true}/> 
              </FormControl> 

              <Grid container style={{justifyContent: 'center'}}>        

                <Button
                  type="submit"
                  disabled={formInvalid()}
                  variant="contained"             
                  className={classes.submit}
                >
                  Recuperar
                </Button>

                <Button         
                  variant="contained"  
                  onClick={backLogin}
                  className={classes.cancel}            
                >
                  Regresar
                </Button>

              </Grid>

              <AlertError />

              <React.Fragment>
                <Snackbar open={openConfirmation} autoHideDuration={6000} onClose={handlerCloseConfirmation}>
                  <Alert onClose={handlerCloseConfirmation} severity="success">
                    {messageConfirmation}
                  </Alert>
                </Snackbar>
              </React.Fragment>
            </form>

          </Grid>
        
        </Grid>

      </Container>
      <Footer />
    </React.Fragment>
  )
}

ResetPassword.propTypes = {
  token: PropTypes.string,
}

export default ResetPassword
