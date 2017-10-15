import React, {Component} from 'react';
//import TimerHeader from '../../TimerHeader/components/TimerHeader';
import TimerDisplay from '../../TimerDisplay/components/TimerDisplay';



class Timer extends Component {
  render()
  {
    return (
        <div className='container-fluid timer'>
          <h4 className='text-center'> Study With Me</h4>
          <span className='online-users'> Online users: {99/* this.props.onlineUsers */} </span>
          {/* <TimerHeader 
            timerState={ this.props.timerState }
            timerCycle={ this.props.timerCycle }
          /> */}
          <TimerDisplay 
            timestamp={ 99/*this.props.timestamp */}
          />
        </div>
    );
  }
}

export default Timer;