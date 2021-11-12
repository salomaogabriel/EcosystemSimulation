import Genes from "../genes";
import { Dijkstra, getNodesInShortestPathOrder } from "../../dijkstra/index";

export default class Animal {
  constructor(column = 0, row = 0, diet = "plant", grid, animalType) {
    //position
    this.column = column;
    this.row = row;
    this.grid = grid;
    //information
    this.animalType = animalType;
    this.target = null;
    this.diet = diet;
    this.age = 0;
    this.hungry = 0;
    this.maxAge = 100;
    this.maxHungry = 100;
    this.maxThirsty = 100;
    this.thirsty = 0;
    this.urgeToReproduce = 0;
    this.sex = Math.floor(Math.random() * 2) == 1 ? "male" : "female";
    this.createGenes();
    this.speed = 10;
    this.sigth = 10;
    this.curAction = "";
    this.isAlive = true;
    this.start();
  }
  createGenes() {
    let newGenes = new Genes(4, [0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1]);
    // let newGenes = new Genes(4);
    let genes = newGenes.getGenes();
    this.genes = genes;
  }
  start() {
    setInterval(() => {
      //INCREASES VALUES
      this.age++;
      this.urgeToReproduce++;
    }, 6000);
    let i = 0;
    setInterval(() => {
      //food and water are related to the
      i++;
      // if (i > 2) return;
      this.hungry++;
      this.thirsty++;
      this.selectMovement();
    }, 20000 / this.speed);
  }
  selectMovement() {
    let selectedAction = this.selectAction();

    if (selectedAction == "drink") {
    }
    if (selectedAction == "mate") {
      //future be drink

      let dijkstraFunc = [];
      dijkstraFunc = Dijkstra(
        true,
        this.grid,
        this.grid[this.row][this.column],
        this.sigth
      );

      for (let i = 0; i < dijkstraFunc.length; i++) {
        const element = dijkstraFunc[i];

        if (element.isWater == true) {
          this.setTarget(element);
          return;
        }
      }
    }
  }
  setTarget(target) {
    console.log(target);
    // console.log(this.grid[this.row][this.column]);
    this.target = target;
    let shortestPath = getNodesInShortestPathOrder(target);
    let directionRow = shortestPath[1].row - this.row;
    let directionColumn = shortestPath[1].column - this.column;
    console.log(directionRow, directionColumn);

    this.move(directionRow, directionColumn);
    this.resetGrid();
  }
  resetGrid() {
    let grid = [];
    for (let row = 0; row < this.grid.length; row++) {
      let currentRow = [];
      for (let column = 0; column < this.grid[row].length; column++) {
        currentRow.push(resetNode(this.grid[row][column]));
      }
      grid.push(currentRow);
    }
    this.grid = grid;
  }
  selectAction() {
    let hungryLeftBeforeDie = this.maxHungry - this.hungry;
    let thirstyLeftBeforeDie = this.maxThirsty - this.thirsty;
    let urgeToReproduce = this.urgeToReproduce;

    if (
      this.hungry < this.maxHungry / 10 &&
      this.thirsty < this.maxThirsty / 10
    ) {
      //go look for a mate
      return "mate";
    }
    if (this.hungryLeftBeforeDie < this.thirstyLeftBeforeDie) {
      //look for a water source
      return "drink";
    } else {
      // look for food
      return "eat";
    }
  }
  move(row, column) {
    // console.log(this.grid[row][column]);
    document
      .getElementById(`node-${this.row}-${this.column}`)
      .classList.remove(this.animalType);
    if (
      row == -1 &&
      this.row > 0 &&
      !this.grid[this.row - 1][this.column].isWater
    )
      this.row--;
    if (
      row === 1 &&
      this.row < this.grid.length - 1 &&
      !this.grid[this.row + 1][this.column].isWater
    )
      this.row++;
    if (
      column === 1 &&
      this.column < this.grid[0].length - 1 &&
      !this.grid[this.row][this.column + 1].isWater
    )
      this.column++;
    if (
      column == -1 &&
      this.column > 0 &&
      !this.grid[this.row][this.column - 1].isWater
    )
      this.column--;

    document
      .getElementById(`node-${this.row}-${this.column}`)
      .classList.add(this.animalType);
  }
}

const resetNode = (oldNode) => {
  return {
    column: oldNode.column,
    row: oldNode.row,
    terrainType: oldNode.terrainType,
    isWater: oldNode.isWater,
    chanceToGrowPlant: oldNode.chanceToGrowPlant,
    canHavePlants: oldNode.canHavePlants,
    hasRabbit: oldNode.hasRabbit,
    hasFox: oldNode.hasFox,
    hasPlant: oldNode.hasPlant,
    distance: Infinity,
    isVisited: false,
    previousNode: null,
  };
};
