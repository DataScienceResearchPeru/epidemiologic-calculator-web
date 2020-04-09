import React from 'react'
import { Container, Box } from '@material-ui/core'

import Footer from '../Footer/Footer'
import Header from '../Header/Header'

const UnconfirmedAccount = () => {
  return (
    <React.Fragment>
      <Container component="main" maxWidth="lg">
        <Header />
        <Box>
          <h2>¡Bienvenido!</h2>
          <p>No has confirmado tu cuenta. Revise su bandeja de entrada (y su carpeta de correo no deseado): debería haber recibido un correo electrónico con un enlace de confirmación.</p>
          <p>¿No recibió el correo electrónico? <a href="#">Reenviar</a>.</p>
        </Box> 
      </Container>
      <Footer />
    </React.Fragment>
  )
}
  
UnconfirmedAccount.propTypes = {}

UnconfirmedAccount.defaultProps = {}

export default UnconfirmedAccount
