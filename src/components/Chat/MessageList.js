import React from 'react';
import Message from './Message.js';
import Notification from './Notification.js';

const MessageList = (props) => {
    const messages = props.messages.map((message) => {
      if ( message.type === 'message'){
        return (<Message key={message.id} message={message} />)
      } else {
        return (<Notification key={message.id} message={message}/>)
      }
    });
    return (
      <div className='message-list'>

          { messages }

      </div>
    )
}

export default MessageList;