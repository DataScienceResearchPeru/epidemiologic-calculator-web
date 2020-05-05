import React, {useEffect, useRef, useState} from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
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
import DashboardPage from '../../containers/DashboardPage'
import ProfileUser from "../ProfileUser/ProfileUser";
import {useNavigation} from "react-navi";
import Login from "../Login/Login";
import RegisterUser from "../RegisterUser/RegisterUser";

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 50
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    marginTop: 90,
    marginLeft: 20,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    borderRadius: 17,
    backgroundColor: '#24DADA'
  },
  drawerClose: {
    marginTop: 90,
    marginLeft: 20,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    },
    borderRadius: 17,
    backgroundColor: '#24DADA'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  font: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold'
  },
  item: {
    height: 100
  },
  icon: {
    marginTop: 180,
    color: '#fff'
  },
  main: {
    width: "100%"
  }
}))

const NavBar = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const navigationRef = useRef(useNavigation())
  const navigation = useNavigation()
  let view

  let url = navigationRef.current.getCurrentValue().url.pathname
  if (url.includes("/dashboard")) {
    view = <DashboardPage />
  } else {
    view = <ProfileUser />
  }

  const handleDashboard = () => {
    navigation.navigate('/dashboard')
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <List>
          {['PANEL', 'CALCULADORA', 'ESTADISTICAS', 'COMPARATIVO'].map(
            (text, index) => (
              <ListItem button key={text} className={classes.item}>
                <ListItemIcon>
                  {index === 0 ? (
                    <a onClick={handleDashboard}>
                      <img src={dash} alt='dash' />
                    </a>
                  ) : index === 1 ? (
                    <img src={calculator} alt='calc' />
                  ) : index === 2 ? (
                    <img src={chart} alt='chart' />
                  ) : (
                    <img src={compare} alt='compare' />
                  )}
                </ListItemIcon>
                <ListItemText className={classes.font} primary={text} />
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
      <main className={classes.main}>
        {view}
      </main>
    </div>
  )
}

NavBar.propTypes = {}

NavBar.defaultProps = {}

export default NavBar
