import React, { Component } from "react";

export class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      day: 0,
      timeDuration: parseInt(props.timeDuration, 10),
      timeLeft: parseInt(props.timeDuration, 10),
    };
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }
  updateTime() {
    let newTime = this.state.timeLeft - 1;

    if (newTime < 0) {
      let newDay = this.state.day + 1;
      this.setState({ timeLeft: this.state.timeDuration, day: newDay });
      return;
    }
    this.setState({ timeLeft: newTime });
  }
  render() {
    return (
      <>
        <h1>{`Day: ${this.state.day}`}</h1>
        <h1>{`Time: ${this.state.timeLeft}`}</h1>
      </>
    );
  }
}

export default Clock;
