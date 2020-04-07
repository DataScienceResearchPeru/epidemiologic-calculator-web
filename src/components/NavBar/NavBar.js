import React from 'react';
import PropTypes from 'prop-types';
import styles from './NavBar.module.css';

const NavBar = () => (
  <div className={styles.NavBar} data-testid="NavBar">
    NavBar Component
  </div>
);

NavBar.propTypes = {};

NavBar.defaultProps = {};

export default NavBar;
