import React, { Component } from "react";

export class Animal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      row: 0,
      column: 0,
    };
  }
  render() {
    return <div></div>;
  }
}

export default Animal;
