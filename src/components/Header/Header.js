import React from 'react'
// import PropTypes from 'prop-types'
// import styles from './Header.module.css'
import { AppBar, Toolbar, Button, makeStyles, Box, Drawer, List, Divider, ListItem } from '@material-ui/core'

import AppIcon from '../AppIcon/AppIcon'



const hederclasses = makeStyles((theme) => ({
  header: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    WebkitBoxShadow: 'none',
  },
  toolbar: {
    ...theme.mixins.toolbar,
    height:80,
  },
  icon: {
    fontSize: 170,
    marginLeft: 130,
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
      <AppBar position="static" color="inherit" className={classes.appBar}>
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
