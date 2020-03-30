import React from 'react'
// import PropTypes from 'prop-types'
import styles from './AppIcon.module.css'
import { SvgIcon } from '@material-ui/core'
import { ReactComponent as Logo } from './EK-logo.svg'


const AppIcon = (props) => (
  <div className={styles.AppIcon} data-testid="AppIcon">
    <SvgIcon {...props}>
      <Logo></Logo>
    </SvgIcon>
  </div>
)

AppIcon.propTypes = {}

AppIcon.defaultProps = {}

export default AppIcon
