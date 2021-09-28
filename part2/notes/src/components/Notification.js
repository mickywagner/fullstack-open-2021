import React from "react";

const Notification = ({message}) => {
  return (
    <div className="error" style={message == null ? {display: 'none'} : {display: 'block'}}>
      {message}
    </div>
  );
};

export default Notification;
