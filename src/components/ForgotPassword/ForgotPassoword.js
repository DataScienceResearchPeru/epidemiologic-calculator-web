import React, { useState, useEffect } from 'react'
import { useResource } from 'react-request-hook'
import { Input, Button, FormControl, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'
import { api } from '../../middleware/api'
import useErrorApi from '../../hooks/use-error-api'

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    fontFamily: '"Raleway","Roboto", "Helvetica", "Arial", sans-serif',
    '& .MuiInputBase-root': {
      border: '1px solid #ccc',
      borderRadius: 10,
      marginTop: 0,
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
  submit: {
    margin: theme.spacing(4, 0, 2),
    backgroundColor: '#33CCCC',
    color: '#FFF',
    borderRadius: 15,
    fontSize: 12,
    padding: '6px 27px',
    minWidth: 135,
    boxShadow: '0px 2px 4px #00000029',
    lineHeight: 1.5,
    marginRight: '20px'
  },
  cancel: {
    margin: theme.spacing(4, 0, 2),
    color: '#000',
    borderRadius: 15,
    fontSize: 12,
    padding: '6px 27px',
    minWidth: 135,
    boxShadow: '0px 2px 4px #00000029',
    lineHeight: 1.5
  }
}))

function Alert (props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const ForgotPassword = (props) => {
  const [username, setUsername] = useState('')
  const [openConfirmation, setConfirmation] = useState(false)
  const [messageConfirmation, setMessageConfirmation] = useState('')

  const classes = useStyles()

  const [user, forgotPassword] = useResource(api.forgotPassword)

  const [stateError, AlertError, setData] = useErrorApi(user)

  function validateEmail (email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  const emailValid = () => {
    return ((username.length === 0) || validateEmail(username) === false)
  }

  useEffect(() => {
    setData(user)
    if (user && user.data && !stateError) {
      setConfirmation(true)
      setMessageConfirmation(user.data.message)
    }
  }, [user])

  function handleUsername (e) {
    setUsername(e.target.value)
  }

  const handleCloseConfirmation = () => {
    setConfirmation(false)
    close()
  }

  const close = () => {
    if (props.handler) props.handler()
  }

  return (
    <form className={classes.form} data-testid='ForgotPassword' onSubmit={e => { e.preventDefault(); forgotPassword(username) }}>

      <FormControl margin='normal' fullWidth>
        <Input type='email' value={username} onChange={handleUsername} autoFocus disableUnderline />
      </FormControl>
      <Grid container style={{ justifyContent: 'center' }}>

        <Button
          type='submit'
          variant='contained'
          disabled={emailValid()}
          className={classes.submit}
        >
          Recuperar
        </Button>

        <Button
          variant='contained'
          onClick={close}
          className={classes.cancel}
        >
          Cerrar
        </Button>

      </Grid>

      <AlertError />

      <>
        <Snackbar open={openConfirmation} autoHideDuration={6000} onClose={handleCloseConfirmation}>
          <Alert onClose={handleCloseConfirmation} severity='success'>
            {messageConfirmation}
          </Alert>
        </Snackbar>
      </>

    </form>
  )
}

ForgotPassword.propTypes = {
  handler: PropTypes.func
}

ForgotPassword.defaultProps = {}

export default ForgotPassword
