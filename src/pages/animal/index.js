import Genes from "../genes";
import { Dijkstra, getNodesInShortestPathOrder } from "../../dijkstra/index";

export default class Animal {
  constructor(
    column = 0,
    row = 0,
    diet = "plants",
    grid,
    animalType,
    getGrid,
    moveAnimalPos,
    killAnimal,
    reproduce,
    checkForLife
  ) {
    //position
    this.column = column;
    this.row = row;
    this.grid = grid;
    this.plantsGrid = grid;
    this.getGrid = getGrid;
    this.moveAnimalPos = moveAnimalPos;
    this.killAnimal = killAnimal;
    this.reproduce = reproduce;
    this.checkForLife = checkForLife;
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
    this.sigth = 5;
    this.curAction = "";
    this.action = "random";
    this.isAlive = true;
    this.normalInterval = undefined;
    this.speedInterval = undefined;
    this.start();
  }
  die() {
    //stop intervals
    console.log("died");
    clearInterval(this.normalInterval);
    clearInterval(this.speedInterval);
    document
      .getElementById(`node-${this.row}-${this.column}`)
      .classList.remove(this.animalType);
    this.moveAnimalPos(
      this.grid[this.row][this.column],
      this.grid[this.row][this.column],
      this.animalType,
      true
    );
  }
  createGenes() {
    let newGenes = new Genes(4, [0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1]);
    // let newGenes = new Genes(4);
    let genes = newGenes.getGenes();
    this.genes = genes;
  }
  start() {
    this.normalInterval = setInterval(() => {
      //INCREASES VALUES
      this.age++;
      if (this.age > this.maxAge) {
        this.die();
      }
      this.urgeToReproduce++;
    }, 6000);
    this.speedInterval = setInterval(() => {
      this.worldGrid = this.getGrid();
      if (!this.checkForLife(this.row, this.column)) {
        this.die();
      }
      //food and water are related to the

      if (this.hungry > this.maxHungry) {
        this.die();
      }
      if (this.thirsty > this.maxThirsty) {
        this.die();
      }
      this.hungry++;
      this.thirsty++;
      this.selectMovement();
    }, 20000 / this.speed);
  }
  selectMovement() {
    let drinkTarget = null;
    let foodTarget = null;
    let mateTarget = null;
    this.resetGrid();

    let dijkstraWater = Dijkstra(
      true,
      this.grid,
      this.grid[this.row][this.column],
      this.sigth
    );
    for (let i = 0; i < dijkstraWater.length; i++) {
      const element = dijkstraWater[i];

      if (element.isWater == true) {
        drinkTarget = element;
        i = dijkstraWater.length + 2;
      }
    }
    this.resetGrid();

    let dijkstraLand = Dijkstra(
      false,
      this.grid,
      this.grid[this.row][this.column],
      this.sigth
    );

    for (let x = 0; x < dijkstraLand.length; x++) {
      const element = dijkstraLand[x];
      if (element.row == this.row && element.column == this.column) continue;
      if (
        this.diet == "plants" &&
        this.worldGrid[element.row][element.column].hasPlants == true
      ) {
        foodTarget = element;
        x = dijkstraLand.length + 2;
      }
      if (
        this.diet == "plants" &&
        this.worldGrid[element.row][element.column].hasRabbit == true
      ) {
        mateTarget = element;

        x = dijkstraLand.length + 2;
      }
      if (
        this.diet == "rabbit" &&
        this.worldGrid[element.row][element.column].hasRabbit == true
      ) {
        foodTarget = element;
        x = dijkstraLand.length + 2;
      }
      if (
        this.diet == "rabbit" &&
        this.worldGrid[element.row][element.column].hasFox == true
      ) {
        mateTarget = element;
        x = dijkstraLand.length + 2;
      }
    }
    let selectedAction = this.selectAction(drinkTarget, mateTarget, foodTarget);

    if (selectedAction == "drink") {
      this.action = "drink";
      this.setTarget(drinkTarget);
    }
    if (selectedAction == "mate") {
      this.action = "mate";

      this.setTarget(mateTarget);
    }
    if (selectedAction == "food") {
      this.action = "food";

      this.setTarget(foodTarget);
    }
    if (selectedAction == "random") {
      this.action = "random";

      this.moveRandomly();
      this.resetGrid();
    }
  }
  moveRandomly() {
    let hasMoved = false;
    let random = Math.floor(Math.random() * 4);
    switch (random) {
      case 0:
        if (
          this.row > 0 &&
          !this.grid[this.row - 1][this.column].isWater &&
          random == 0
        ) {
          this.move(-1, 0);
        }
        break;
      case 1:
        if (
          this.row < this.grid.length - 1 &&
          !this.grid[this.row + 1][this.column].isWater &&
          random == 1
        ) {
          this.move(1, 0);
        }
        break;
      case 2:
        if (
          this.column < this.grid[0].length - 1 &&
          !this.grid[this.row][this.column + 1].isWater &&
          random == 2
        ) {
          this.move(0, 1);
        }
        break;
      case 3:
        if (
          this.column > 0 &&
          !this.grid[this.row][this.column - 1].isWater &&
          random == 3
        ) {
          this.move(0, -1);
        }
        break;
      default:
        if (
          this.row > 0 &&
          !this.grid[this.row - 1][this.column].isWater &&
          random == 0
        ) {
          this.move(-1, 0);
        }
        break;
    }
  }
  setTarget(target) {
    if (target == null) return;

    this.target = target;
    let shortestPath = getNodesInShortestPathOrder(target);

    let directionRow = shortestPath[1].row - this.row;
    let directionColumn = shortestPath[1].column - this.column;
    this.checkForTarget(shortestPath);
    this.move(directionRow, directionColumn);
    this.resetGrid();
  }
  checkForTarget(shortestPath) {
    if (shortestPath[1].isWater && this.action == "drink") {
      this.thirsty = 1;
    }
    if (
      this.worldGrid[shortestPath[1].row][shortestPath[1].column].hasPlants &&
      this.action == "food" &&
      this.diet == "plants"
    ) {
      this.hungry = 0;
    }
    if (
      this.worldGrid[shortestPath[1].row][shortestPath[1].column].hasRabbit &&
      this.action == "food" &&
      this.diet == "rabbit"
    ) {
      this.hungry = 0;
      // kill rabbit
      this.killAnimal(shortestPath[1].row, shortestPath[1].column);
    }
    if (
      this.worldGrid[shortestPath[1].row][shortestPath[1].column].hasRabbit &&
      this.action == "mate" &&
      this.animalType == "rabbit"
    ) {
      this.urgeToReproduce = 0;
      //reproduce
      this.reproduce(this.row, this.column, this.animalType);
    }
    if (
      this.worldGrid[shortestPath[1].row][shortestPath[1].column].hasFox &&
      this.action == "mate" &&
      this.animalType == "fox"
    ) {
      this.urgeToReproduce = 0;
      //reproduce
      this.reproduce(this.row, this.column, this.animalType);
    }
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
  selectAction(drink, mate, eat) {
    //this for now sucks but it's better than nothing

    if (drink == null && mate == null && eat == null) return "random";

    let hungryLeftBeforeDie = this.maxHungry - this.hungry;
    let thirstyLeftBeforeDie = this.maxThirsty - this.thirsty;
    let urgeToReproduce = this.urgeToReproduce;

    let distanceToDrink = drink == null ? 9999 : drink.distance;
    let distanceToMate = mate == null ? 9999 : mate.distance;
    let distanceToFood = eat == null ? 9999 : eat.distance;
    //Maybe in the future add a randomizer
    //Mate Decision
    if (
      this.hungry < this.maxHungry / 10 &&
      this.thirsty < this.maxThirsty / 10
    ) {
      if (distanceToMate !== 9999 && this.urgeToReproduce > 10) {
        return "mate";
      } else {
        return "random";
      }
    }
    if (
      this.hungry < this.maxHungry / 2 &&
      this.thirsty < this.maxThirsty / 2 &&
      distanceToFood == 9999 &&
      distanceToDrink == 9999
    ) {
      if (distanceToMate !== 9999 && this.urgeToReproduce > 10) {
        return "mate";
      } else {
        return "random";
      }
    }
    if (urgeToReproduce > 50) {
      if (distanceToMate !== 9999 && this.urgeToReproduce > 10) {
        return "mate";
      }

      return "random";
    }

    ///Drink Decision
    if (distanceToDrink == 9999 && distanceToFood == 9999) return "random";
    if (thirstyLeftBeforeDie <= hungryLeftBeforeDie) {
      if (distanceToFood >= distanceToDrink) {
        if (distanceToDrink == 9999) {
          return "random";
        } else {
          return "drink";
        }
      }
      if (
        distanceToFood + 5 < distanceToDrink &&
        thirstyLeftBeforeDie > 30 &&
        this.hungry > 10
      )
        return "food";
      if (
        distanceToFood < distanceToDrink &&
        hungryLeftBeforeDie - 10 > thirstyLeftBeforeDie
      )
        return "drink";
    }

    //food
    if (thirstyLeftBeforeDie > hungryLeftBeforeDie) {
      if (distanceToFood < distanceToDrink) {
        return "food";
      }
      if (
        distanceToFood > distanceToDrink + 5 &&
        hungryLeftBeforeDie > 30 &&
        this.thirsty > 10
      )
        return "drink";
      if (
        distanceToFood > distanceToDrink &&
        hungryLeftBeforeDie < thirstyLeftBeforeDie - 10
      )
        return "food";
    }
    return "random";
  }
  move(row, column) {
    let oldPos = this.grid[this.row][this.column];
    document
      .getElementById(`node-${this.row}-${this.column}`)
      .classList.remove(this.animalType);
    if (
      row == -1 &&
      this.row > 0 &&
      !this.grid[this.row - 1][this.column].isWater &&
      !this.worldGrid[this.row - 1][this.column].hasRabbit &&
      !this.worldGrid[this.row - 1][this.column].hasFox
    )
      this.row--;
    if (
      row === 1 &&
      this.row < this.grid.length - 1 &&
      !this.grid[this.row + 1][this.column].isWater &&
      !this.worldGrid[this.row + 1][this.column].hasRabbit &&
      !this.worldGrid[this.row + 1][this.column].hasFox
    )
      this.row++;
    if (
      column === 1 &&
      this.column < this.grid[0].length - 1 &&
      !this.grid[this.row][this.column + 1].isWater &&
      !this.worldGrid[this.row][this.column + 1].hasRabbit &&
      !this.worldGrid[this.row][this.column + 1].hasFox
    )
      this.column++;
    if (
      column == -1 &&
      this.column > 0 &&
      !this.grid[this.row][this.column - 1].isWater &&
      !this.worldGrid[this.row][this.column - 1].hasRabbit &&
      !this.worldGrid[this.row][this.column - 1].hasFox
    )
      this.column--;
    this.moveAnimalPos(
      oldPos,
      this.grid[this.row][this.column],
      this.animalType
    );
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
    hasPlants: oldNode.hasPlants,
    distance: Infinity,
    isVisited: false,
    previousNode: null,
  };
};
