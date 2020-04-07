import React, { useState, useContext, useEffect } from 'react'
import { useResource } from 'react-request-hook'
import { useNavigation, Link } from 'react-navi'
import { Input, Button, Checkbox, FormControlLabel, FormControl, InputLabel, InputAdornment, IconButton, Grid } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { StateContext } from '../../contexts'
import { api } from '../../middleware/api'

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    '& .MuiInputBase-root': {
      border: '1px solid #ccc',
      borderRadius: 12,
      marginTop: 22,
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
      color: '#56cdcc',
      fontWeight: 500,
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
  button: {
    borderRadius: 16,
    fontSize: 12,
    padding: '7px 30px',
    minWidth: 150,
  },
  submit: {
    margin: theme.spacing(6, 0, 2),
    backgroundColor: '#56cdcc',
    color: '#FFF',
  }
}))

const Login = () => {
  const { dispatch } = useContext(StateContext)
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ showPassword, setshowPassword ] = useState(false)
  const [ loginFailed, setLoginFailed ] = useState(false)

  const classes = useStyles()

  const [ user, login ] = useResource(api.login)

  const navigation = useNavigation()

  useEffect(() => {
    if (user && user.data) {
      setLoginFailed(false)
      dispatch({ type: 'LOGIN', name: user.data.full_name })
      navigation.navigate('/dashboard') 
    }
    if (user && user.error) {
      console.log(user.error.data.message)
      setLoginFailed(true)
    }
  }, [user])

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
    <form className={classes.form} onSubmit={e => { e.preventDefault(); login(username, password) }}>  
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="username" shrink>Usuario o correo electrónico</InputLabel>
        <Input id="username" type="email" value={username} onChange={handleUsername} autoFocus disableUnderline={true}/>
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="password" shrink>Contraseña</InputLabel>
        <Input
          id="password"
          disableUnderline={true}
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={password}
          onChange={handlePassword}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
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
            control={<Checkbox value="remember" color="primary" size="small" />}
            label="Recordar mis datos"
          />
        </Grid>
        <Grid item>
          <Link href="#" className={classes.forgotPassword}>
            {'¿Olvidaste tu contraseña?'}
          </Link>
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        disabled={username.length === 0 || password.length === 0}
        className={`${classes.button} ${classes.submit}`}
      >
        Ingresar
      </Button>

      {loginFailed && <span style={{ color: 'red' }}>Invalid username or password</span>}
    </form>
  )
}

Login.propTypes = {}

Login.defaultProps = {}

export default Login
