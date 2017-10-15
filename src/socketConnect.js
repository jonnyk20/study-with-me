
let socket = io.connect();

const greeting = () => {
  console.log('hello from socket connect')
}

// test to make sure connection is established
socket.on('connect', function() {
  console.log('connected to socket')
  socket.emit('test', 'hello from client')
});
socket.on('test', (data) => {
  console.log('message from server:', data)
})
///




export default {
  greeting
}