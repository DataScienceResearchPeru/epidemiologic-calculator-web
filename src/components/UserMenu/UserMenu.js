import React from 'react';
import PropTypes from 'prop-types';
import styles from './UserMenu.module.css';

const UserMenu = () => (
  <div className={styles.UserMenu} data-testid="UserMenu">
    UserMenu Component
  </div>
);

UserMenu.propTypes = {};

UserMenu.defaultProps = {};

export default UserMenu;
