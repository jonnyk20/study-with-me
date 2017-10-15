import React from 'react';

const TimerConfig = (props) => {

  const handleChange = (ev) => {
    props.onSetTimer(ev.target.id, ev.target.value);
  }

    return (
      <div>
        <div className='row'>
          <div className='col-md-5'>
            <div className='row'>
             Study Time
            </div>
            <div className='row'>

              <div className='col-sm-6'>
                <div className='row'>
                  Min
                </div>
                <div className='row'>
                  <input 
                      id='studyMinutes'
                      className='form-control' 
                      type='number' 
                      value={ props.studyMinutes }
                      onChange={ handleChange }
                      min='0'
                    />
                </div>
              </div>

              <div className='col-sm-6'>
                <div className='row'>
                  Sec
                </div>
                <div className='row'>
                  <input 
                    id='studySeconds'
                    className='form-control' 
                    type='number' 
                    value={ props.studySeconds }
                    onChange={ handleChange }
                    min='0'
                  />
                </div>
              </div>

            </div>
          </div>
          <div className='col-md-5'>
            <div className='row'>
              Break Time
            </div>
            <div className='row'>

              <div className='col-sm-6'>
                <div className='row'>
                  Min
                </div>
                <div className='row'>
                  <input 
                    id='breakMinutes'
                    className='form-control' 
                    type='number' 
                    value={ props.breakMinutes }
                    onChange={ handleChange }
                    min='0'
                  />
                </div>
              </div>

              <div className='col-sm-6'>
                <div className='row'>
                  Sec
                </div>
                <div className='row'>
                  <input 
                    id='breakSeconds'
                    className='form-control' 
                    type='number' 
                    value={ props.breakSeconds }
                    onChange={ handleChange }
                    min='0'
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );

}

export default TimerConfig;