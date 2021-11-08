import React, { Component } from "react";
import "./index.css";
export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: props.column,
      row: props.row,
      terrain: props.terrain,
      isWater: props.isWater,
      growPlantsInterval: props.growPlantsInterval * 1000,
      chanceToGrowPlant: props.chanceToGrowPlant,
      plantStatus: "",
      canHavePlants: props.canHavePlants,
      addPlantToNode: props.addPlantToNode,
    };
  }
  componentDidMount() {
    this.tryToGrowPlant();

    setInterval(() => {
      this.tryToGrowPlant();
    }, this.state.growPlantsInterval);
  }
  tryToGrowPlant() {
    if (this.state.isWater && !this.state.canHavePlants) {
      return;
    }
    const randomChance = Math.random() / 2 - 0.3;

    if (randomChance > this.state.chanceToGrowPlant) {
      //Update value To all
      this.state.addPlantToNode(this.state.row, this.state.column);
      this.setState({ plantStatus: "plant" });
    }
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
        <div
          className={`node ${terrainClass} ${this.state.plantStatus}`}
          id={`node-${this.state.row}-${this.state.column}`}
        ></div>
      </>
    );
  }
}
