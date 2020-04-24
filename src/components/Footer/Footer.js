import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import logo from '../../images/logo-grey.png'

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: theme.spacing(3),
    '& .MuiContainer-root': {
      display: 'flex',
      alignItems: 'center'
    },
    '& .MuiTypography-body1': {
      fontFamily: '"avenir next", AvenirsNext, sans-serif',
      fontSize: '0.6rem',
      lineHeight: 1.2,
      color: '#a0a0a0',
      fontWeight: 600
    },
    '& .MuiTypography-root': {
      display: 'inline-block',
      marginLeft: theme.spacing(1)
    }
  },
  logo: {
    maxWidth: 50,
    marginLeft: theme.spacing(1)
  },
  subtitle: {
    fontWeight: 300
  }
}))

const Footer = () => {
  const classes = useStyles()
  return (
    <footer className={classes.footer} data-testid='Footer'>
      <Container maxWidth='lg'>
        <img src={logo} alt='logo' className={classes.logo} />
        <Typography align='left'>
          Data Science Research Perú <br />
          <span className={classes.subtitle}>Todos los derechos reservados © 2020</span>
        </Typography>
      </Container>
    </footer>
  )
}

Footer.propTypes = {}

Footer.defaultProps = {}

export default Footer
