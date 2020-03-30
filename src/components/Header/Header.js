import React from 'react'
// import PropTypes from 'prop-types'
// import styles from './Header.module.css'
import { AppBar, Toolbar, Button, makeStyles, Box } from '@material-ui/core'
import AppIcon from '../AppIcon/AppIcon'

const hederclasses = makeStyles((theme) => ({
  header: {
    flexGrow: 1,
  },
  toolbar: {
    height:50,
  },
  icon: {
    fontSize: 140,
  },
  iconBox: {
    flexGrow: 1,
    textAlign: 'initial'
  },
}))

const Header = () => {
  // TODO funciones de la cabecera
  // - cuando se hace click en login debe desplegar un pop up
  //   que permita hacer login.
  // - analizar si existira algun menu o navbar para agregarlo
  const classes = hederclasses()
  return (
    <Box className={classes.header} data-testid="Header" display="block">
      <AppBar position="static" color="primary">
        <Toolbar className={classes.toolbar}>
          <div className={classes.iconBox}>
            <AppIcon className={classes.icon}></AppIcon>
          </div>
          <Button color="inherit" >Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

Header.propTypes = {}

Header.defaultProps = {}

export default Header
