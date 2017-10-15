let socket = io.connect();

const greeting = () => {
  console.log('hello from socket connect')
}

// test to make sure connection is established
// socket.on('connect', function() {
//   console.log('connected to socket')
//   socket.emit('test', 'hello from client')
// });
// socket.on('test', (data) => {
//   console.log('message from server:', data)
// })
///

socket.on('connect_error', function() {
  console.log('Connection failed');
});
socket.on('reconnect_failed', function() {
  console.log('Reconnection failed');
});


function subscribeToTimer(onInitiated, onUpdated, onUserCountUpdate) {
  socket.emit('requestStatus');
  socket.on('timerStatus', function(status){
    console.log('status received')
    onInitiated(null, status);
  })
  socket.on('timerUpdate', function(type, str){
    onUpdated(type, str)
  })
  socket.on('userCountChange', function(newUserCount){
    onUserCountUpdate(newUserCount)
  })
  console.log('request for status sent');
} 

function modifyTimer(command, newStudyTime, newBreakTime){
  socket.emit('modifyTimer', command, newStudyTime, newBreakTime);
  console.log('modify event emitted');
  console.log(command, newStudyTime, newBreakTime);
}

function sendMessageToSever(message){
  socket.emit('messageSubmit', message)
}

function sendUserNameChange(oldUsername, newUsername){
  socket.emit('nameChange', oldUsername, newUsername)
}

function updateChat(onNewMessage, onNewNotification, assignColor){
  socket.on('colorAssign', assignColor)
  socket.on('newMessage', onNewMessage);
  socket.on('newNotification', onNewNotification);
}




module.exports = {
  greeting,
  subscribeToTimer,
  modifyTimer,
  sendMessageToSever,
  sendUserNameChange,
  updateChat
}