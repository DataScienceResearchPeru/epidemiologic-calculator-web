/**
 * FIX:
 * Unused variables here!
 * Verify that they are not nedded before to delete this comment.
 *
 * On imports:
 * import PropTypes from 'prop-types'
 */
import React from 'react'

import styles from './Calculator.module.css'

const Calculator = () => (
  <div className={styles.Calculator} data-testid='Calculator'>
    Calculator Component
  </div>
)

Calculator.propTypes = {}

Calculator.defaultProps = {}

export default Calculator
