import React, { Component } from "react";
import "./index.css";
export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terrain: props.terrain,
    };
  }
  getTerrainClass(terrain) {
    switch (true) {
      case terrain < 0.2:
        return "water";
        break;
      case terrain > 0.2:
        return "land";
        break;

      default:
        return "land";
        break;
    }
  }
  render() {
    let terrainClass = this.getTerrainClass(this.state.terrain);
    return (
      <>
        <div className={`node ${terrainClass}`}></div>
      </>
    );
  }
}
