import React, { useState } from 'react'
import styles from './Notification.module.css'

const Notification = ({
  children,
  type,
  dismissable
}) => {
  const [show, setShow] = useState(true)

  console.log("children: ", children)
  console.log("type: ", type)
  console.log("dismissable: ", dismissable)

  if (!show) {
    return null
  }

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      {
        dismissable ? (
          <span onClick={() => setShow(false)}>
            &times;
          </span>
        ) : null
      }
      {children}
    </div>
  )
}

export default Notification