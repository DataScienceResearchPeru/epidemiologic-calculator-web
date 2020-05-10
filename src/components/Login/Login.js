import React, { useState, useContext, useEffect, useRef } from 'react'
import { useResource } from 'react-request-hook'
import { useNavigation, Link } from 'react-navi'
import { Input, Button, Checkbox, FormControlLabel, FormControl, InputLabel, InputAdornment, IconButton, Grid } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import { StateContext } from '../../contexts'
import { api } from '../../middleware/api'
import useErrorApi from '../../hooks/use-error-api'
import useLocalStorage from '../../hooks/local-storage'

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    fontFamily: '"Raleway","Roboto", "Helvetica", "Arial", sans-serif',
    '& .MuiInputBase-root': {
      border: '1px solid #ccc',
      borderRadius: 10,
      marginTop: 22,
      WebkitBoxShadow: '0px 1px 4px #00000033',
      boxShadow: '0px 1px 4px #00000033'
    },
    '& .MuiInputBase-input': {
      height: '2em',
      padding: '6px 8px 7px',
      '&:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 30px white inset !important',
        borderRadius: 'inherit'
      }
    },
    '& .MuiInputLabel-formControl': {
      color: '#33CCCC',
      fontWeight: 500,
      fontSize: '1.2rem'
    },
    '& .MuiCheckbox-root': {
      padding: 0
    },
    '& .MuiFormControlLabel-root': {
      float: 'left',
      marginLeft: 0
    },
    '& .MuiTypography-body1': {
      fontSize: '0.8rem',
      color: '#a0a0a0',
      marginLeft: 4
    }
  },
  forgotPassword: {
    fontSize: '0.8rem',
    color: '#a0a0a0',
    textDecoration: 'none'
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
    lineHeight: 1.5
  }
}))

const Login = (props) => {
  const { dispatch } = useContext(StateContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setshowPassword] = useState(false)
  const [, setToken] = useLocalStorage('token', null)
  const [, setEmail] = useLocalStorage('email', null)

  const classes = useStyles()

  const [user, login] = useResource(api.login)

  const [stateError, AlertError, setData] = useErrorApi(user)

  const navigation = useRef(useNavigation())

  useEffect(() => {
    setData(user)
    if (user && user.data && !stateError) {
      dispatch({ type: 'LOGIN', name: user.data.full_name })
      setToken(user.data.access_token)
      setEmail(user.data.email)
      navigation.current.navigate('/dashboard')
    }
  }, [user, dispatch, setData, stateError, setToken, setEmail])

  function handleUsername (e) {
    setUsername(e.target.value)
  }

  function handlePassword (e) {
    setPassword(e.target.value)
  }

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword)
  }

  return (
    <form className={classes.form} data-testid='Login' onSubmit={e => { e.preventDefault(); login(username, password) }}>
      <FormControl margin='normal' fullWidth>
        <InputLabel htmlFor='username' shrink>Usuario o correo electrónico</InputLabel>
        <Input id='username' type='email' value={username} onChange={handleUsername} autoFocus disableUnderline />
      </FormControl>
      <FormControl margin='normal' fullWidth>
        <InputLabel htmlFor='password' shrink>Contraseña</InputLabel>
        <Input
          id='password'
          disableUnderline
          type={showPassword ? 'text' : 'password'}
          name='password'
          value={password}
          onChange={handlePassword}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Grid container>
        <Grid item xs>
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' size='small' />}
            label='Recordar mis datos'
          />
        </Grid>
        <Grid item>
          <Link href='#' className={classes.forgotPassword} onClick={props.handleForgotPassword}>
            ¿Olvidaste tu contraseña?
          </Link>
        </Grid>
      </Grid>
      <Button
        type='submit'
        variant='contained'
        disabled={username.length === 0 || password.length === 0}
        className={classes.submit}
      >
        Ingresar
      </Button>

      <AlertError />
    </form>
  )
}

Login.propTypes = {
  handleForgotPassword: PropTypes.func
}

Login.defaultProps = {}

export default Login
