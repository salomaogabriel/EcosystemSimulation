import React, { Component } from "react";
import Node from "../node/index";
import "./index.css";

//Manages the Grid Map of the simulation.
export class Grid extends Component {
  constructor(props) {
    super(props);
    //the number of the columns is defined by the width and the number of rows is defined by the height
    this.state = {
      width: props.width,
      height: props.height,
      grid: [],
    };
  }
  componentDidMount() {
    this.createGrid(this.state.width, this.state.height);
  }

  createGrid(width, height) {
    let grid = [];
    for (let row = 0; row < height; row++) {
      let currentRow = [];
      for (let column = 0; column < width; column++) {
        currentRow.push([]);
      }
      grid.push(currentRow);
    }
    this.setState({ grid: grid });
  }

  render() {
    let grid = this.state.grid;
    return (
      <div className="grid">
        {grid.map((row, rowKey) => {
          return (
            <div className="row" key={rowKey}>
              {row.map((column, columnKey) => {
                return <Node key={columnKey} terrain={Math.random(0, 2)} />;
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Grid;
