import React from 'react';
import TimerConfig from './TimerConfig.js';

const AdminPanel = (props) => {
  const onCommandClick = (event) => {
    console.log('click!')
    const command = event.target.dataset.command;
    console.log('command clicked', command)
    props.controlTimer(command)
  };

  return (
          <div>
            <div className='admin row'>
             
              <div className='col-sm-3'>
                <button className='btn btn-success' data-command='start' onClick={onCommandClick}>Start</button>
                <button className='btn btn-danger' data-command='stop' onClick={onCommandClick}>Stop</button>
                <button className='btn btn-primary' data-command='pause' onClick={onCommandClick}>Pause</button>
                <button className='btn btn-info' data-command='resume' onClick={onCommandClick}>Resume</button>
                <div >{ props.timestamp }</div>
              </div>
              
              <div className='col-md-5'>
                <TimerConfig 
                  studyMinutes={ props.studyMinutes }
                  studySeconds={ props.studySeconds }
                  breakMinutes={ props.breakMinutes }
                  breakSeconds={ props.breakSeconds }
                  onSetTimer={ props.onSetTimer }
                /> 
              </div>
            </div>
          </div>
      )


}
  
export default AdminPanel;