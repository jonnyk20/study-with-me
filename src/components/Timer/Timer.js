import React, {Component} from 'react';
import TimerHeader from './TimerHeader.js';
import TimerDisplay from './TimerDisplay.js';



class Timer extends Component {
  render()
  {
    return (
        <div className='timer'>
          <h4 className='text-center'> Study With Me</h4>
          <div className='online-users text-center'> Online users: {this.props.onlineUsers} </div>
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