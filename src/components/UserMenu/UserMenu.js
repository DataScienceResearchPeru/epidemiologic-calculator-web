import React, { useContext } from 'react'
import { Button, IconButton, Menu, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import NotificationsNoneRoundedIcon from '@material-ui/icons/NotificationsNoneRounded'
import { useNavigation } from 'react-navi'

import { StateContext } from '../../contexts'

const useStyles = makeStyles((theme) =>({
  root: {
    padding: theme.spacing(0, 1, 0, 0.25)
  },
  label: {
    textTransform: 'capitalize',
    fontWeight: 'normal',
    color: '#585858',
    fontSize: '1rem',
    letterSpacing: 'normal'
  },
  expandIcon: {
    marginLeft: 10
  },
  userIcon: {
    fontSize: '2.8rem'
  },
  notificationIcon: {
    fontSize: '1.8rem',
    color: '#000'
  }
}))

const UserMenu = () => {
  const { state, dispatch } = useContext(StateContext)
  const { user } = state
  const [anchorEl, setAnchorEl] = React.useState(null)
  const navigation = useNavigation()
  const classes = useStyles()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    navigation.navigate('/') 
  }

  return (
    <div>
      <IconButton color="primary" aria-label="add to shopping cart">
        <NotificationsNoneRoundedIcon className={classes.notificationIcon} />
      </IconButton>

      <IconButton
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="inherit"
        classes={{root: classes.root}}
      >
        <AccountCircle className={classes.userIcon}/>
      </IconButton>
        
      <Button classes={{label: classes.label}} aria-controls="profile-menu" aria-haspopup="true" onClick={handleClick}>
        {user}
        <ExpandMoreIcon className={classes.expandIcon}/>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Perfil</MenuItem>
        <MenuItem onClick={handleLogout}>Salir</MenuItem>
      </Menu>
    </div>
  )
}

UserMenu.propTypes = {}

UserMenu.defaultProps = {}

export default UserMenu
