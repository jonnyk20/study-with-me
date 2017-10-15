import '../assets/stylesheets/base.scss';
import React, { Component } from 'react';
import timerStates from '../../lib/timerStates';
import timerCycles from '../../lib/timerCycles';
import socketConnect from '../socketConnect';
import Timer from './Timer/Timer.js';



class App extends Component {
  constructor(){
    super();
    console.log('constructed!')
  }

  render() {
    console.log("rendering")
    return (
      <div>
        <h1>Hello, {this.props.name}!</h1>
        <p>Study With Me is under mainenance. The site will be back online by October 17th, 2017 :) </p>
        <Timer />
      </div>
    )
  }
};

export default App;
