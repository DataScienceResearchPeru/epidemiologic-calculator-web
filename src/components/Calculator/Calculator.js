import React from 'react';
import PropTypes from 'prop-types';
import styles from './Calculator.module.css';

const Calculator = () => (
  <div className={styles.Calculator} data-testid="Calculator">
    Calculator Component
  </div>
);

Calculator.propTypes = {};

Calculator.defaultProps = {};

export default Calculator;
