import React from 'react'

const NotificationMessage = ({message}) => {
    return(
        <div>
            {
                message !== null ? message : ""
            }
        </div>
    )
}

export default NotificationMessage