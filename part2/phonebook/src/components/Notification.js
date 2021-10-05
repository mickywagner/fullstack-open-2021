import React from 'react';

const Notification = ({message, type}) => {

    let style;

    type === "success" ? style = {
        background: 'lightgray',
        color: 'green',
        border: '2px solid green',
        borderRadius: '5px',
        fontSize: '1.25rem',
        margin: '10px 0',
        padding: '5px',
    } : style = {
        background: 'lightgray',
        color: 'red',
        border: '2px solid red',
        borderRadius: '5px',
        fontSize: '1.25rem',
        margin: '10px 0',
        padding: '5px',
    }

    return(
        <div className="notification" style={message != null ? style : { display: 'none'}}>
            {message}
        </div>
    )
}

export default Notification;
