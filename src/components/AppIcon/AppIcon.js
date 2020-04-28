import React from 'react'
import styles from './AppIcon.module.css'
import { SvgIcon } from '@material-ui/core'
import { ReactComponent as Logo } from '../../images/EK-logo.svg'

const AppIcon = (props) => (
  <div className={styles.AppIcon} data-testid='AppIcon'>
    <SvgIcon {...props}>
      <Logo />
    </SvgIcon>
  </div>
)

AppIcon.propTypes = {}

AppIcon.defaultProps = {}

export default AppIcon
