import React, { useContext } from 'react'
import {
  AppBar,
  Toolbar,
  TextField,
  Button,
  InputAdornment
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-navi'
import logo from '../../images/EK-logo.svg'
import UserMenu from '../UserMenu/UserMenu'
import { StateContext } from '../../contexts'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    flexWrap: 'wrap',
    minHeight: 90,
    paddingLeft: 100,
    paddingRight: 100
  },
  menuButton: {
    marginRight: 3
  },
  hide: {
    display: 'none'
  },
  logo: {
    flexGrow: 1,
    '& img': {
      maxWidth: 205
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(1),
    maxWidth: 250,
    [theme.breakpoints.up('sm')]: {
      width: 'auto'
    }
  },
  searchInput: {
    '& .MuiInputBase-input': {
      padding: '8px 14px'
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 10,
      boxShadow: '0px 1px 4px #00000033'
    },
    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: 0
    }
  },
  button: {
    borderRadius: 15,
    fontSize: 10,
    padding: '8px 30px',
    minWidth: 150,
    marginLeft: 24,
    boxShadow: '0px 2px 4px #00000029'
  }
}))

const Header = () => {
  const { state } = useContext(StateContext)
  const { user } = state
  const classes = useStyles()

  return (
    <AppBar
      position='static'
      color='transparent'
      elevation={0}
    >
      <Toolbar className={classes.toolbar}>
        <div className={classes.logo}>
          <Link href='/'>
            <img src={logo} alt='logo' />
          </Link>
        </div>
        <div className={classes.search}>
          <TextField
            id='search'
            variant='outlined'
            className={classes.searchInput}
            InputProps={{
              endAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </div>

        {user && <UserMenu user={user} />}

        {!user && <Button variant='outlined' className={classes.button}>Contáctanos</Button>}
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {}

Header.defaultProps = {}

export default Header
