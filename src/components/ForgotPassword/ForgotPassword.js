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
    }
  },
  submit: {
    backgroundColor: '#33CCCC',
    marginRight: '20px'
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
  }, [user, stateError, setData])

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

      <Grid container style={{ justifyContent: 'center', margin: '32px 0px 16px' }}>
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
