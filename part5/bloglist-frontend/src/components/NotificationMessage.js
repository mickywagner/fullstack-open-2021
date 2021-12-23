import React from "react"
import PropTypes from "prop-types"

const NotificationMessage = ({ message }) => {
  return(
    <div>
      {
        message !== null ? message : ""
      }
    </div>
  )
}

NotificationMessage.propTypes = {
  message: PropTypes.string
}

export default NotificationMessage