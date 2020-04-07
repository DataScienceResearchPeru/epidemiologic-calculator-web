import React from 'react'
import PropTypes from 'prop-types'
import styles from './NavBar.module.css'

import { makeStyles, Drawer, List, ListItem } from '@material-ui/core'

import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'

import DashboardIcon from '@material-ui/icons/Dashboard'
import FunctionsIcon from '@material-ui/icons/Functions'
import BarChartIcon from '@material-ui/icons/BarChart'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows'

const drawerWidth = 240


const navbarclasses = makeStyles((theme) => ({
  NavBar: {
    
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth + 30,
    height: '85%',
    marginTop: 80,
    marginLeft: '1.5%',
    backgroundColor: '#33cccc',
    borderRadius: 15,
  },
  listItem: {
    height: 90,
  },
  listItemIcon: {
    fontSize: 40,
  },
  listItemText: {
    marginLeft: 20,
  },
}))

const NavBar = () => {
  const classes = navbarclasses()
  return (
    <div className={styles.NavBar} data-testid="NavBar">
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button className={classes.listItem} key={'PANEL'}>
            <DashboardIcon className={classes.listItemIcon} />  
            <ListItemText className={classes.listItemText}>
              PANEL
            </ListItemText>
          </ListItem>
          <ListItem button selected={true} className={classes.listItem} key={'CALCULATOR'}>
            <FunctionsIcon className={classes.listItemIcon} />  
            <ListItemText className={classes.listItemText}>
              CALCULATOR
            </ListItemText>
          </ListItem>
          <ListItem button className={classes.listItem} key={'ESTADISTIC'}>
            <BarChartIcon className={classes.listItemIcon} />  
            <ListItemText className={classes.listItemText}>
              ESTADISTICAS
            </ListItemText>
          </ListItem>
          <ListItem button className={classes.listItem} key={'COMPARATIVE'}>
            <CompareArrowsIcon className={classes.listItemIcon} />  
            <ListItemText className={classes.listItemText}>
              COMPARATIVAS
            </ListItemText>
          </ListItem>
          
        </List>
      </Drawer>
    </div>
  )
}

NavBar.propTypes = {}

NavBar.defaultProps = {}

export default NavBar
