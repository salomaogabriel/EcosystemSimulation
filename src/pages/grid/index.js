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
      growPlantsInterval: props.timeDuration,
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
        currentRow.push(createTerrain(column, row));
      }
      grid.push(currentRow);
    }
    console.log(grid);
    this.setState({ grid: grid });
  }
  addPlantToNode(row, column) {
    let grid = this.state.grid;
    const newNode = {
      ...grid[row][column],
      hasPlants: true,
    };
    grid[row][column] = newNode;
  }
  render() {
    let grid = this.state.grid;
    return (
      <div className="grid">
        {grid.map((row, rowKey) => {
          return (
            <div className="row" key={rowKey}>
              {row.map((column, columnKey) => {
                const columnValue = column.column;
                const rowValue = column.row;
                const terrainType = column.terrainType;
                const isWater = column.isWater;
                const chanceToGrowPlant = column.chanceToGrowPlant;
                const canHavePlants = column.canHavePlants;
                return (
                  <Node
                    key={columnKey}
                    column={columnValue}
                    row={rowValue}
                    terrain={terrainType}
                    isWater={isWater}
                    growPlantsInterval={this.state.growPlantsInterval}
                    chanceToGrowPlant={chanceToGrowPlant}
                    canHavePlants={canHavePlants}
                    addPlantToNode={(row, column) =>
                      this.addPlantToNode(row, column)
                    }
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Grid;

const createTerrain = (column, row) => {
  let terrain = Math.random();
  let grow = Math.random();
  let canHavePlants = Math.random();
  const isWater = terrain < 0.2 ? true : false;
  canHavePlants = canHavePlants < 0.5 ? true : false;
  return {
    column,
    row,
    terrainType: terrain,
    isWater: isWater,
    chanceToGrowPlant: grow,
    canHavePlants: canHavePlants,
  };
};
