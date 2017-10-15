import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: '',
      user: this.props.user.username
    }
  }  

  render() {
    return (
      <div className='chatbar row center-block'>
          <div className='col col-sm-3 chat-input-container'>
            <input 
              onKeyPress={(event) => {
                if(event.key === 'Enter') {
                 this.onHandleUserSubmit(event)
                }
              }}
              onBlur={() => this.onHandleUserSubmit()}
              className='chatbar-username form-control ' 
              value={this.state.user}
              onChange={(event) => this.onUserChange(event)}
            />
          </div>

          <div className='col-sm-9 chat-input-container'>
            <input
              className='chatbar-message form-control' 
              value={this.state.message}
              placeholder='say hi to your study partners...'
              onChange={(event) => this.onMessageChange(event)}
              onKeyPress={(event) => {
                if(event.key === 'Enter') {
                  this.onHandleMessageSubmit()
                }
              }}
            />
          </div>
      </div>
    );
  }

  onMessageChange(e){
    this.setState({
      message: e.target.value
    })
  }

  onHandleMessageSubmit(){
    this.props.onSubmitMessage({
      type: 'message',
      username: this.state.user, 
      content: this.state.message,
      color: this.props.user.color
    })
  }

  onUserChange(e){
    this.setState({
      user: e.target.value
    })
  }

  onHandleUserSubmit(){
    this.props.onNewUsername(this.state.user)
  }

}
export default ChatBar;
