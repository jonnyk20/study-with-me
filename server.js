var path = require('path');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Timer = require('./lib/timer.js');
var uuidv1 = require('uuid/v1');

// using webpack-dev-server and middleware in development environment
if (process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'dist')));


app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html')
});

server.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  }
});


// timer initiation
const t = new Timer([25, 0], [5, 0]);
t.startTimer();

t.on('tick', (type, str) => {
  console.log('tick', type, str)
  io.emit('timerUpdate', type, str);
})


// socket code 

var userCount = 0;
var userColor = 0;
io.on('connection', (client) => {

  // Test code
  // client.on('test', (data) => {
  //   console.log('from client:', data)
  //   client.emit('test', 'server got your message')
  // })
  ////

  userCount += 1;
  console.log('client connected! Client count', userCount.toString())

  client.emit('colorAssign', userColor.toString())
  console.log('assigning color:', userColor)
  userColor = userColor === 3 ? 0 : userColor + 1;

  const newUser ={
    id: uuidv1(),
    type: 'userCountChange',
    content: 'A new user has connected',
    userCount: userCount,
    timestamp: Date.now()
  }

  io.emit('newNotification', JSON.stringify(newUser))
  io.emit('userCountChange', userCount.toString())
  client.emit('timer', 'welcome!');

  client.on('disconnect', function() {
    userCount -= 1;
    console.log('client disconneted!');
    io.emit('userCountChange', userCount.toString())
    const departingUser ={
      id: uuidv1(),
      type: 'userCountChange',
      content: 'A user has disconnected',
      userCount: userCount,
      timestamp: Date.now()
    }
    io.emit('newNotification', JSON.stringify(departingUser));
  });

  // timer events

  client.on('requestStatus', function(){
    console.log('status sent')
    client.emit('timerStatus', t.timerInfo)
  })

  client.on('modifyTimer', function(command, newStudyTime, newBreakTime) {
    console.log('command from client:', command);
    t.accessTimer(command, newStudyTime, newBreakTime);
    client.emit('timerStatus', t.timerInfo)
  });


  // chat events
  client.on('messageSubmit', function(message){
    const submittedMesage = JSON.parse(message);
    submittedMesage.id = uuidv1();
    submittedMesage.timestamp = Date.now();
    io.emit('newMessage', JSON.stringify(submittedMesage));
  })

  client.on('nameChange', function(oldUsername, newUsername){
    console.log('name chaange received')
    console.log(oldUsername, newUsername)
    const nameChangeUpdate = {
      id: uuidv1(),
      type: 'nameChange',
      content: `${oldUsername} has changed their name ${newUsername}`,
      timestamp: Date.now()
    }
    io.emit('newNotification', JSON.stringify(nameChangeUpdate));
  })
});
