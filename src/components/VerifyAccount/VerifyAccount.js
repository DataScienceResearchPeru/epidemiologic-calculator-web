import React from 'react'
import { useResource } from 'react-request-hook'
import PropTypes from 'prop-types'
import { Container, Box } from '@material-ui/core'
import { Link } from 'react-navi'

import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { api } from '../../middleware/api'

const MessageSuccess = () => {
  return (
    <Box>
      <h2>Verificación confirmada</h2>
      <p>Su dirección de email se ha verificado con éxito.</p>
      <Link href={'/'}>ir al login</Link>
    </Box>
  )
}

const MessageFailed = () => {
  return (
    <Box>
      <h2>Verificación Fallida</h2>
      <p>El enlace no es válido o ha expirado.</p>
      <Link href={'/'}>Volver al inicio</Link>
    </Box>
  )
}

const VerifyAccount = (props) => {
  const { token } = props
  const [ response ] = useResource(api.verifyAccount, [token])
  let message

  if (response.data) {
    message = <MessageSuccess />
  } else {
    message = <MessageFailed />
  }

  return (
    <React.Fragment>
      <Container component="main" maxWidth="lg">
        <Header />
        { message }
      </Container>
      <Footer />
    </React.Fragment>
  )
}

VerifyAccount.propTypes = {
  token: PropTypes.string,
}

export default VerifyAccount
