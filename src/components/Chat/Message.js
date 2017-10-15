import React from 'react';

const Message = (props) => {
    const messageColors = ['purple', 'blue', 'green', 'orange'];
    return (
      <div className='row'>
        <div className={`col-sm-3 message-username message-username user-${messageColors[props.message.color]}`}>
          { props.message.username }
        </div>
        <div className='col-sm-9 message-content'>
          { props.message.content }
        </div>
      </div>
    )
}

export default Message;