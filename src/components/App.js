import '../assets/stylesheets/base.scss';
import React, { Component } from 'react';

let socket = io.connect();

class App extends Component {
  componentDidMount() {
    socket.on('connect', function(data) {
      socket.emit('join', 'hello world from the client!');
    });
    socket.on('test', function(data){
      console.log('message from server')
      console.log(data)
    })
  }

  render() {
    return (
      <h1>Hello, {this.props.name}!</h1>
    )
  }
};

export default App;
