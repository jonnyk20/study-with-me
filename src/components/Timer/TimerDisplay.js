import React from 'react';

const TimerDisplay = (props) => (
  <div>
      <div className='row'>
        <h2 className='mx-auto'>
          { props.timestamp }
        </h2>
    </div>
</div>
);

export default TimerDisplay;