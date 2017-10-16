import '../assets/stylesheets/base.scss';
import React, { Component } from 'react';
import timerStates from '../../lib/timerStates';
import timerCycles from '../../lib/timerCycles';
import { subscribeToTimer, modifyTimer } from '../socketConnect';
import Timer from './Timer/Timer.js';
import AdminPanel from './AdminPanel/AdminPanel.js';
import ChatContainer from './Chat/ChatContainer.js'


class App extends Component {
  constructor(){
    super();
    console.log('constructed!');
    this.controlTimer = this.controlTimer.bind(this)
    this.onTimerUpdate = this.onTimerUpdate.bind(this)
    this.onTimerInitiated = this.onTimerInitiated.bind(this)
    this.onSetTimer = this.onSetTimer.bind(this);
    this.onUserCountChange = this.onUserCountChange.bind(this);
    this.assignChatColor = this.assignChatColor.bind(this);
    subscribeToTimer(this.onTimerInitiated, this.onTimerUpdate, this.onUserCountChange, this.assignChatColor);
    this.state = {
      admin: false,
      timestamp: 'Waiting for Time',
      timerState: timerStates.STOPPED,
      timerCycle: timerCycles.STUDY,
      studyMinutes: 0,
      studySeconds: 0,
      breakMinutes: 0,
      breakSeconds: 0,
      onlineUsers: 0,
      chatColor: 0
    };
  }

  render() {
    console.log("rendering")
    return (
      <div>
        <button className='btn btn-default btn-sm btn-admin' onClick={()=> this.toggleAdmin()}>.</button>
        <div className='container'>
            { this.state.admin && <AdminPanel
              timestamp={ this.state.timestamp }
              controlTimer={ this.controlTimer }
              onSetTimer={ this.onSetTimer }
              studyMinutes={ this.state.studyMinutes }
              studySeconds={ this.state.studySeconds }
              breakMinutes={ this.state.breakMinutes }
              breakSeconds={ this.state.breakSeconds }
            /> }


          <div className='card mx-auto app-content'>
              <Timer
                onlineUsers={ this.state.onlineUsers }
                timestamp={ this.state.timestamp }
                timerCycle={ this.state.timerCycle }
                timerState={ this.state.timerState }
              />
          </div>

          { (this.state.timerCycle !== timerCycles.BREAK) &&
          <div className='center-block text-center text-primary'> 
            Chat Window will appear during break periods
          </div>
          }

          { (this.state.timerCycle === timerCycles.BREAK) &&
          <ChatContainer
            chatColor={ this.state.chatColor }
            onUserCountChange={ this.onUserCountChange }
          />
        }
        </div>
      </div>
    )
  }
  toggleAdmin(){
    this.setState({
      admin: !this.state.admin
    })
  }

  controlTimer(command, newStudyTime, newBreakTime){
    modifyTimer(command, newStudyTime, newBreakTime);
  }

  onTimerUpdate(type, str) {
    if (type === 'time') {
      this.setState({ 
      timestamp: str
    })
    } else if (type === 'timerState') {
      console.log('timer state received', type, str);
      this.setState({
        timerState: timerStates[str]
      });
    } else if (type === 'timerCycle') {
      console.log('timer cycle received', type, str);
      this.setState({
        timerCycle: timerCycles[str]
      });
    } else {
      console.log('unknown update type', type, str)
    }
  }
  onTimerInitiated(err, timerStatus, cb) {
    console.log('setting state...')
    const {
      studyMinutes,
      studySeconds,
      breakMinutes,
      breakSeconds,
      timerState,
      timerCycle
    } = JSON.parse(timerStatus);
    this.setState({
      studyMinutes,
      studySeconds,
      breakMinutes,
      breakSeconds,
      timerState: timerStates[timerState],
      timerCycle: timerCycles[timerCycle],
    }, cb);
  }
  onSetTimer(timeProperty, timeValue){
    this.setState({
      [timeProperty]: timeValue
    }, ()=>{
      this.controlTimer('setTime', [this.state.studyMinutes, this.state.studySeconds], [this.state.breakMinutes, this.state.breakSeconds])
    })
  }
  onUserCountChange(newUserCount) {
    console.log('user count updated! Now', parseInt(newUserCount, 10))
    this.setState({
      onlineUsers: parseInt(newUserCount, 10)
    })
  }

  assignChatColor(color){
    console.log('color received')
    console.log(color)
    this.setState({
      chatColor: parseInt(color, 10)
    })
  }
};

export default App;
