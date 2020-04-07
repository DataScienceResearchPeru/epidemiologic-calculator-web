import React from 'react';
import PropTypes from 'prop-types';
import styles from './Variable.module.css';

const Variable = () => (
  <div className={styles.Variable} data-testid="Variable">
    Variable Component
  </div>
);

Variable.propTypes = {};

Variable.defaultProps = {};

export default Variable;
