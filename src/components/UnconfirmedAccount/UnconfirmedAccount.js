import React, { useContext, useEffect } from 'react'
import { useResource } from 'react-request-hook'
import { Container, Box, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MailOutlineIcon from '@material-ui/icons/MailOutline'

import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { StateContext } from '../../contexts'
import { api } from '../../middleware/api'

const useStyles = makeStyles((theme) => ({
  boxContent: {
    borderRadius: 17,
    backgroundColor: '#5ad6d6',
    padding: '80px 100px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    color: '#FFF',
    minHeight: 400,
    '& h1': {
      fontSize: '1.8em',
      fontWeight: 500,
    },
    '& a': {
      color: '#FFF',
      fontWeight: 600
    }
  },
  icon: {
    textAlign: 'center',
    '& .MuiSvgIcon-root': {
      fontSize: '9em',
    }
  }
}))

const UnconfirmedAccount = () => {
  const { state } = useContext(StateContext)
  const { user } = state
  const classes = useStyles()
  const [ response, resendEmail ] = useResource(api.resendEmail)

  useEffect(() => {
    if (response && response.error) {
      console.log(response.error.data.message)
    }
  }, [])

  return (
    <React.Fragment>
      <Container component="main" maxWidth="lg">
        <Header />
        <Box className={classes.boxContent}>
          <h1>¡Bienvenido!</h1>
          <p>Por favor revise su correo electrónico ({user}) y pulsa en el enlace de confirmación que te enviamos.
            Si no ha recibido nuestro correo electrónico en 15 minutos, verifique su carpeta de correo no deseado.</p>
          <p>¿Aún no recibió el correo electrónico? pulse {user && <Link href="#" underline="none" onClick={e => resendEmail(user)}>reenviar</Link>}.</p>

          <div className={classes.icon}>
            <MailOutlineIcon />
          </div>
        </Box> 
      </Container>
      <Footer />
    </React.Fragment>
  )
}
  
UnconfirmedAccount.propTypes = {}

UnconfirmedAccount.defaultProps = {}

export default UnconfirmedAccount
