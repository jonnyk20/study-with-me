import React, {Component} from 'react';
import TimerHeader from './TimerHeader.js';
import TimerDisplay from './TimerDisplay.js';



class Timer extends Component {
  render()
  {
    return (
        <div className='container-fluid timer'>
          <h4 className='text-center'> Study With Me</h4>
          <span className='online-users'> Online users: {this.props.onlineUsers} </span>
          <TimerHeader 
            timerCycle={ this.props.timerCycle }
            timerState={ this.props.timerState }
          />
          <TimerDisplay 
            timestamp={ this.props.timestamp }
          />
        </div>
    );
  }
}

export default Timer;