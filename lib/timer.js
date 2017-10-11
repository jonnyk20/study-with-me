var { EventEmitter } = require('events');
var leftPad = require('left-pad');
var moment = require('moment');
var timerStates = require('./timerStates');
var timerCycles = require('./timerCycles');
var pad = (num) => leftPad(num, 2, '0');

class Timer extends EventEmitter {
  constructor(studyTimeArr, breakTimeArr) {
    super();
    this.setTimer(studyTimeArr, breakTimeArr);
    this._timerState = timerStates.STOPPED;
  }

  setTimer([studyMinutes, StudySeconds], [breakMinutes, breakSeconds]) {
    this._studyTime = moment.duration({
      minutes: studyMinutes,
      seconds: StudySeconds
    });
    this._breakTime = moment.duration({
      minutes: breakMinutes,
      seconds: breakSeconds
    });
  }
  
  startTimer() {
    if (this._timerState === timerStates.RUNNING) {
      return;
    }
    this.tick('timerState', timerStates.RUNNING)
    this._countDown = setInterval(() => this.reduceTimer(), 1000);
    this._timerState = timerStates.RUNNING;
    return this.startStudy();
  }

  startStudy(){
    this.tick('timerCycle', timerCycles.STUDY);
    this._currentTime = moment.duration(this._studyTime.asMilliseconds());
    this._timerCycle = timerCycles.STUDY;
  }

  startBreak(){
    this.tick('timerCycle', timerCycles.BREAK);
    this._currentTime = moment.duration(this._breakTime.asMilliseconds());
    this._timerCycle = timerCycles.BREAK;
  }

  reduceTimer() {
    if (this._currentTime.asSeconds() === 0 ) {
      if (this._timerCycle === timerCycles.STUDY) {
        return this.startBreak();
      } else {
        return this.startStudy();
      }
    }
    var currentMinutes = this._currentTime.minutes();
    var currentSeconds = this._currentTime.seconds();
    var timeString = `${pad(currentMinutes)}:${pad(currentSeconds)}`
    this.tick('time', timeString);
    return this._currentTime.subtract(1, 'second');
  }

  tick(type, str) {
    this.emit('tick', type, str);
  }

  pauseTimer() {
    this._timerState = timerStates.PAUSED;
    this.tick('timerState', timerStates.PAUSED)
    clearInterval(this._countDown);
  }

  resumeTimer() {
    if (this._timerState === timerStates.RUNNING) {
      return;
    }
    this._timerState = timerStates.RUNNING;
    this.tick('timerState', timerStates.RUNNING)
    this._countDown = setInterval(() => this.reduceTimer(), 1000);
  }

  stopTimer() {
    clearInterval(this._countDown);
    this._currentTime = moment.duration(this._studyTime.asMilliseconds());
    this._timerState = timerStates.STOPPED;
    this.tick('timerState', timerStates.STOPPED)
  }

  get studyTime() {
    return this._studyTime.humanize();
  }

  get breakTime() {
    return this._breakTime.humanize();
  }

  get timerInfo() {
    var timerInfo = {
      studyMinutes: this._studyTime.minutes(),
      studySeconds: this._studyTime.seconds(),
      breakMinutes: this._breakTime.minutes(),
      breakSeconds: this._breakTime.seconds(),
      timerState: this._timerState,
      timerCycle: this._timerCycle
    }
    return JSON.stringify(timerInfo);
  }

  accessTimer(command, studyTime, breakTime){
    console.log('timer access command received by timer!');
    switch (command){
      case 'stop':
        this.stopTimer();
        break;
      case 'pause':
        this.pauseTimer();
        break;
      case 'start':
        this.startTimer();
        break;
      case 'resume':
        this.resumeTimer();
        break;
      case 'setTime':
        this.setTimer(studyTime, breakTime);
        break;
      default:
        console.log('command not recognized');
    }
  }
}

module.exports = Timer;

/////////////////////////////////////
// var t = new Timer([0, 8], [0, 3]);
// t.startTimer();
// setTimeout(function() {
//   console.log(t.timerInfo)
// }, 3000);


// console.log(t.studyTime);
//t.startTimer();

// t.accessTimer('setTime', [0, 10], [0, 5])

// setTimeout(function() {
//   t.accessTimer('start')
// }, 3000);


// setTimeout(function() {
//   t.accessTimer('pause')
// }, 5000);

// setTimeout(function() {
//   t.accessTimer('resume')
// }, 7000);

// setTimeout(function() {
//   t.accessTimer('stop')
// }, 10000);



// t.on('tick', (type, data) => {
//   console.log(type, data);
// })