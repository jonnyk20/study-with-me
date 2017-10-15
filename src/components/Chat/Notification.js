import React from 'react';

const Notification = (props) => {
    return (
      <div className='row'>
        <div className='col-sm-12 notification-content'>
        {props.message.content}
        </div>
      </div>
    )
}

export default Notification;