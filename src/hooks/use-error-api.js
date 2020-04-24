import React, { useState, useEffect } from 'react'

import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert (props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

export default () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(true)
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const AlertError = () => {
    let errorMessage = data && data.error ? data.error.data.message : null

    if (errorMessage != null && errorMessage === 'Internal Server Error') {
      errorMessage = 'Ocurrio un problema con tu solicitud, consultar mas tarde.'
    }

    return (
      <>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error'>
            {errorMessage}
          </Alert>
        </Snackbar>
      </>
    )
  }

  useEffect(() => {
    if (data && data.error) {
      setOpen(true)
      setError(true)
    } else {
      setOpen(false)
      setError(false)
    }
  }, [data])

  return [error, AlertError, setData]
}
