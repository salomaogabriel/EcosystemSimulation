import React, { Component } from "react";

export class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      day: 0,
      timeDuration: parseInt(props.timeDuration, 10),
      timeLeft: parseInt(props.timeDuration, 10),
      hour: 0,
      minutes: 0,
      seconds: 0,
      timeScale: this.calculateTimeScale(parseInt(props.timeDuration, 10)),
      simulationClockInterval: 10,
      secondsPerUpdate: 0,
    };
  }
  componentDidMount() {
    let clockIntervalToSeconds = 0.01;
    let secondsPerUpdate = this.state.timeScale * clockIntervalToSeconds;
    this.setState({ secondsPerUpdate: secondsPerUpdate });
    setInterval(() => {
      this.updateTime();
    }, 1000);
    setInterval(() => {
      this.updateSimulationClock();
    }, this.state.simulationClockInterval);
  }

  updateSimulationClock() {
    let hour = this.state.hour;
    let minutes = this.state.minutes;
    let timeScale = this.state.timeScale;
    let seconds = this.state.seconds;
    seconds += this.state.secondsPerUpdate;
    minutes = Math.floor(seconds / 60);
    if (minutes > 60) {
      seconds %= 3600;
      hour++;
    }
    // if (hour > 23) {
    //   hour = 23;
    //   minutes = 59;
    // }

    this.setState({ minutes: minutes });
    this.setState({ hour: hour });
    this.setState({ seconds: seconds });
  }
  //Update the time in seconds
  updateTime() {
    let newTime = this.state.timeLeft - 1;

    if (newTime < 0) {
      let newDay = this.state.day + 1;
      this.setState({
        timeLeft: this.state.timeDuration,
        day: newDay,
        hour: 0,
        minutes: 0,
      });
      return;
    }
    this.setState({ timeLeft: newTime });
  }

  //Calculate the timescale of the simulation,
  //the result of this function is equal to the number of seconds in the simulation compared to the number
  //of seconds in real life
  calculateTimeScale(timeDuration) {
    let secondsInADay = 86400;
    return secondsInADay / timeDuration;
  }
  render() {
    return (
      <>
        <h1>{`Day: ${this.state.day}`}</h1>
        <h1>{`Time: ${this.state.timeLeft}`}</h1>
        <h1>{` ${this.state.hour}:${this.state.minutes}`}</h1>
      </>
    );
  }
}

export default Clock;
