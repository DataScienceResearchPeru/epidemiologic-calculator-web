import React from 'react'
import { AppBar, Toolbar, TextField, Button, InputAdornment } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'
import logo from '../../images/EK-logo.svg'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    flexWrap: 'wrap',
    minHeight: 90,
    paddingLeft: 100,
    paddingRight: 100
  },
  logo: {
    flexGrow: 1,
    '& img': {
      maxWidth: 210
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(4),
    maxWidth: 245,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
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
    minWidth: 150
  }
}))

const Header = () => {
  const classes = useStyles()
  return (
    <AppBar position='static' color='transparent' elevation={0}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.logo}>
          <img src={logo} alt='logo' />
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
        <Button variant='outlined' className={classes.button}>Contáctanos</Button>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {}

Header.defaultProps = {}

export default Header
