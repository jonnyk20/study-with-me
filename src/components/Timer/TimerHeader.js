import React from 'react';

const Header = (props) => (
  <div>
    <div className='text-center'>25 min study - 5 min break </div>
    <div className='text-center'> Current Period: {props.timerCycle} </div>
    <div className='text-center'> Timer State: {props.timerState} </div>
  </div>
);

export default Header;