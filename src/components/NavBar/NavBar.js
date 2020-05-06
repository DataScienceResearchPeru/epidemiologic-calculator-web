import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import calculator from '../../images/calculator.png'
import chart from '../../images/chart.png'
import dash from '../../images/dash.png'
import compare from '../../images/compare.png'

const drawerWidth = 225
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDrawer-paper': {
      position: 'relative',
      minHeight: 1075,
      zIndex: 1,
      overflowX: 'hidden'
    },
    '& .MuiListItem-root': {
      padding: 0
    },
    '& .MuiList-padding': {
      padding: 0
    }
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    borderRadius: '20px 0px 0px 20px',
    background: 'transparent linear-gradient(180deg, #24DADA 0%, #2DB2B2 100%) 0% 0% no-repeat padding-box'
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(10.9)
    },
    borderRadius: '20px 0px 0px 20px',
    background: 'transparent linear-gradient(180deg, #24DADA 0%, #2DB2B2 100%) 0% 0% no-repeat padding-box'
  },
  toolbar: {
    position: 'absolute',
    bottom: 0,
    right: 12,
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  item: {
    height: 100,
    '& .MuiListItemText-primary': {
      color: '#FFF',
      fontSize: '13px',
      fontWeight: 'bold',
      fontFamily: '"Raleway","Roboto", "Helvetica", "Arial", sans-serif'
    },
    '& .MuiListItemIcon-root': {
      paddingLeft: 31
    }
  },
  icon: {
    color: '#FFF'
  }
}))

const NavBar = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <nav className={classes.root}>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: !open,
          [classes.drawerClose]: open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: !open,
            [classes.drawerClose]: open
          })
        }}
      >
        <List>
          {['PANEL', 'CALCULADORA', 'ESTADÍSTICAS', 'COMPARATIVO'].map(
            (text, index) => (
              <ListItem button key={text} className={classes.item}>
                <ListItemIcon>
                  {index === 0 ? (
                    <img src={dash} alt='dash' />
                  ) : index === 1 ? (
                    <img src={calculator} alt='calc' />
                  ) : index === 2 ? (
                    <img src={chart} alt='chart' />
                  ) : (
                    <img src={compare} alt='compare' />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
        <div className={classes.toolbar}>
          <IconButton className={classes.icon} onClick={() => setOpen(!open)}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon fontSize='large' />
            ) : (
              <ChevronLeftIcon fontSize='large' />
            )}
          </IconButton>
        </div>
      </Drawer>
    </nav>
  )
}

NavBar.propTypes = {}

NavBar.defaultProps = {}

export default NavBar
