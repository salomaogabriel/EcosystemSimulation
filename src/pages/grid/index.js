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
      animals: [],

      growPlantsInterval: props.timeDuration,
      rabits: props.rabits,
      foxes: props.foxes,
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
    let animals = [];
    let row,
      column = 0;
    for (let i = 0; i < this.state.foxes; i++) {
      [row, column] = this.getRandomLocation();
      this.state.grid[row][column].hasFox = true;

      animals.push(this.createAnimal(row, column, "rabits", "fox"));
      document.getElementById(`node-${row}-${column}`).classList.add("fox");
    }
    for (let i = 0; i < this.state.rabits; i++) {
      [row, column] = this.getRandomLocation();

      animals.push(this.createAnimal(row, column, "plants", "rabbit"));
      this.state.grid[row][column].hasRabbit = true;
      document.getElementById(`node-${row}-${column}`).classList.add("rabbit");
    }
    this.setState({ animals: animals });
  }
  createAnimal(row, column, diet, animalType) {
    let animal = new Animal(
      column,
      row,
      diet,
      this.state.grid,
      animalType,
      this.getGrid.bind(this),
      this.moveAnimalPos.bind(this)
    );
    return animal;
  }
  moveAnimalPos(oldPos, newPos, animalType) {
    let grid = this.state.grid;
    if (animalType == "rabbit") {
      grid[oldPos.row][oldPos.column].hasRabbit = false;
      grid[newPos.row][newPos.column].hasRabbit = true;
    }
    if (animalType == "fox") {
      grid[oldPos.row][oldPos.column].hasFox = false;
      grid[newPos.row][newPos.column].hasFox = true;
    }
    this.setState({ grid: grid });
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
      }
    }
    this.setState({ grid: grid });
    return [row, column];
  }
  getGrid() {
    return this.state.grid;
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
  let terrain = Math.random() * 10;
  let grow = Math.random();
  let canHavePlants = Math.random();
  const isWater = terrain < 1 ? true : false;
  canHavePlants = canHavePlants < 0.5 ? true : false;
  return {
    column,
    row,
    terrainType: terrain,
    isWater: isWater,
    chanceToGrowPlant: grow,
    canHavePlants: canHavePlants,
    hasRabbit: false,
    hasFox: false,
    hasPlants: false,
    distance: Infinity,
    isVisited: false,
    previousNode: null,
  };
};
