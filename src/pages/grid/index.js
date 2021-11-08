import React, { Component } from "react";
import Node from "../node/index";
import Animal from "../animal/index";
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
      rabits: props.rabits,
      foxes: props.foxes,
      animals: [],
    };
  }
  async componentDidMount() {
    try {
      await this.createGrid(this.state.width, this.state.height);
      this.createAnimals();
    } catch (err) {
      console.log(err);
    }
  }

  createGrid(width, height) {
    return new Promise((resolve) => {
      let grid = [];
      for (let row = 0; row < height; row++) {
        let currentRow = [];
        for (let column = 0; column < width; column++) {
          currentRow.push(createTerrain(column, row));
        }
        grid.push(currentRow);
      }
      this.setState({ grid: grid });
      resolve();
    });
  }
  addPlantToNode(row, column) {
    let grid = this.state.grid;
    const newNode = {
      ...grid[row][column],
      hasPlants: true,
    };
    grid[row][column] = newNode;
  }
  createAnimals() {
    let row,
      column = 0;
    for (let i = 0; i < this.state.foxes; i++) {
      [row, column] = this.getRandomLocation();
      this.createAnimal(row, column, "rabits");
    }
    for (let i = 0; i < this.state.rabits; i++) {
      [row, column] = this.getRandomLocation();

      this.createAnimal(row, column, "plants");
    }
  }
  createAnimal(row, column, diet) {
    let animal = new Animal(column, row, diet);
    console.log(animal);
  }
  getRandomLocation() {
    let grid = this.state.grid;
    let row,
      column = 0;
    let hasPosition = false;
    while (!hasPosition) {
      row = Math.floor(Math.random() * this.state.height);
      column = Math.floor(Math.random() * this.state.width);
      if (!grid[row][column].hasAnimal && !grid[row][column].isWater) {
        hasPosition = true;
        grid[row][column].hasAnimal = true;
        document
          .getElementById(`node-${row}-${column}`)
          .classList.add("animal");
      }
    }
    this.setState({ grid: grid });
    return [row, column];
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
    hasAnimal: false,
  };
};
