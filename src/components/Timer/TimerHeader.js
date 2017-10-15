import React from 'react';

const Header = (props) => (
  <div className='row'>
    <div className='text-center'> Cycle Period: {props.timerCycle} </div>
    <div className='text-center'> Timer State: {props.timerState} </div>
  </div>
);

export default Header;