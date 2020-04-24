import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const DialogContainer = (props) => {
  const { isOpen } = props
  const [open, setOpen] = React.useState(isOpen)

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  const handleOnClose = () => {
    if (props.handler) props.handler()
  }

  return (
    <Dialog open={open} onClose={handleOnClose} aria-labelledby='form-dialog-title' maxWidth='md'>
      <DialogTitle id='form-dialog-title'>Recuperar Contraseña</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Por favor, ingrese su correo electrónico.
        </DialogContentText>
        {props.children}
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Subscribe
        </Button>
      </DialogActions> */}
    </Dialog>
  )
}

DialogContainer.propTypes = {
  isOpen: PropTypes.bool,
  handler: PropTypes.func,
  children: PropTypes.any
}

DialogContainer.defaultProps = {}

export default DialogContainer
