/**
 * FIX:
 * Unused variables here!
 * Verify that they are not nedded before to delete this comment.
 *
 * On imports:
 * import PropTypes from 'prop-types'
 */
import React from 'react'

import styles from './NavBar.module.css'

const NavBar = () => (
  <div className={styles.NavBar} data-testid='NavBar'>
    NavBar Component
  </div>
)

NavBar.propTypes = {}

NavBar.defaultProps = {}

export default NavBar
