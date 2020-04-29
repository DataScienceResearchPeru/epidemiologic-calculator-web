import React from 'react'
import { useResource } from 'react-request-hook'
import PropTypes from 'prop-types'
import { Container, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { api } from '../../middleware/api'
import Message from '../Message/Message'
import background from '../../images/background.svg'

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
      fontWeight: 500
    },
    '& a': {
      color: '#FFF',
      fontWeight: 600
    }
  }
}))

const VerifyAccount = (props) => {
  const { token } = props
  const classes = useStyles()
  const [response] = useResource(api.verifyAccount, [token])
  let message

  if (response.data) {
    message = (
      <Message
        title='Verificación confirmada'
        description='Su dirección de email se ha verificado con éxito.'
        link='ir al login'
      />
    )
  } else {
    message = (
      <Message
        title='Verificación Fallida'
        description='El enlace no es válido o ha expirado.'
        link='Volver al inicio'
      />
    )
  }

  return (
    <>
      <Container component='main' maxWidth='lg'>
        <Header />
        <Box className={classes.boxContent}>
          {message}
        </Box>
      </Container>
      <Footer />
    </>
  )
}

VerifyAccount.propTypes = {
  token: PropTypes.string
}

export default VerifyAccount
