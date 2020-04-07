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
  logo: {
    flexGrow: 1,
    '& img': {
      maxWidth: 210,
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(4),
    maxWidth: 245,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchInput: {
    '& .MuiInputBase-input': {
      padding: '8px 14px'
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 12
    },
    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: 0
    }
  },
  button: {
    borderRadius: 16,
    fontSize: 10,
    padding: '8px 30px',
    minWidth: 150,
  }
}))

const Header = () => {
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
