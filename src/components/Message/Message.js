import React from 'react'
import PropTypes from 'prop-types'
import styles from './Message.module.css'
import { Link } from 'react-navi'

const Message = (props) => {
  const { title, description, link } = props
  
  return (
    <div className={styles.Message} >
      <h1>{title}</h1>
      <p>{description}</p>
      <Link href={'/'}>{link}</Link>
    </div>
  )
}

Message.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}

Message.defaultProps = {}

export default Message
