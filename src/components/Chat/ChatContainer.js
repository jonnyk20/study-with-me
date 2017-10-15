import React, {Component} from 'react';
import ChatBar from './ChatBar';
import MessageList from './MessageList';
import { sendMessageToSever, sendUserNameChange, updateChat  } from '../../socketConnect.js';

export default class ChatContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {
        username: 'user123',
        color: this.props.chatColor
      },
      messages: [],
      usersOnline: 0
    }
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
    this.onNewUsername = this.onNewUsername.bind(this);
    this.getNewMessage = this.getNewMessage.bind(this);
    this.getNewNotification = this.getNewNotification.bind(this);
    updateChat(this.getNewMessage, this.getNewNotification);
    this._isMounted = false;
  }
  render(){
    return (
      <div className='card mx-auto chat-container'>
        <div className='row'>
          <div className='col-md-12'>
            <MessageList 
              messages={ this.state.messages }
            />
            <div className='row'>
              <div className='col-md-12'>
                <ChatBar 
                  user={ this.state.currentUser } 
                  onSubmitMessage={ this.onSubmitMessage }
                  onNewUsername={ this.onNewUsername }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  onSubmitMessage(message){
    sendMessageToSever(JSON.stringify(message))
  }
  onNewUsername(newUsername){
    if (!this._isMounted ){
      return;
    }
    const oldUserName = this.state.currentUser.username;
    if (oldUserName === newUsername) {
      return;
    }
    const currentUser = this.state.currentUser;
    currentUser.username = newUsername;
    this.setState({
      currentUser
    });
    sendUserNameChange(oldUserName, newUsername)
  }
  getNewMessage(newMessage){
    if (!this._isMounted ){
      return;
    }
    console.log("message received")
    const incomingMessage = JSON.parse(newMessage);
    this.setState({
      messages: this.state.messages.concat(incomingMessage)
    })
  }
  getNewNotification(newNotification){
    if (!this._isMounted ){
      return;
    }
    const incomingNotification = JSON.parse(newNotification);
    // if (incomingNotification.type === 'userCountChange') {
    //   this.props.onUserCountChange(incomingNotification.userCount);
    // }
    this.setState({
      messages: this.state.messages.concat(incomingNotification)
    })
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
}