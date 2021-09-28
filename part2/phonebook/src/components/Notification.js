import React from 'react';

const Notification = ({message}) => {

    const successStyle = {
        background: 'lightgray',
        color: 'green',
        border: '2px solid green',
        borderRadius: '5px',
        fontSize: '1.25rem',
        margin: '10px 0',
        padding: '5px',
    }

    return(
        <div className="notification" style={message != null ? successStyle : { display: 'none'}}>
            {message}
        </div>
    )
}

export default Notification;
