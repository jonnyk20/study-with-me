import '../assets/stylesheets/base.scss';
import React, { Component } from 'react';
import timerStates from '../../lib/timerStates';
import timerCycles from '../../lib/timerCycles';

let socket = io.connect();

class App extends Component {
  componentDidMount() {
    console.log('mounted')
    socket.on('connect', function(data) {
      socket.emit('test', 'hello world from the client!');
    });
    socket.on('test', (data) => {
      console.log('message from server:', data)
    })
  }

  render() {
    console.log("rendering")
    return (
      <div>
        <h1>Hello, {this.props.name}!</h1>
        <p>Study With Me is under mainenance. The site will be back online by October 17th, 2017 :) </p>
      </div>
    )
  }
};

export default App;
