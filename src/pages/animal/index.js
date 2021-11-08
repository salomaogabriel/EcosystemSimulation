import Genes from "../genes";
import Dijkstra from "../../dijkstra/index";

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
    this.sigth = 4;
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
    setInterval(() => {
      //food and water are related to the speed
      this.hungry++;
      this.thirsty++;

      let dijkstra = new Dijkstra(
        this.grid,
        this.grid[this.row][this.column],
        this.sigth
      );
      let newGrid = dijkstra.update(
        this.grid,
        this.grid[this.row][this.column],
        true
      );
      this.selectMovement(newGrid);
    }, 20000 / this.speed);
  }
  selectMovement(view) {
    let selectedAction = this.selectAction();

    if (selectedAction == "drink") {
    }
    if (selectedAction == "mate") {
      console.log(view);

      for (let i = 0; i < view.length; i++) {
        const element = view[i];

        if (element.isWater == true) {
          console.log("target set");
          this.setTarget(element);
          return;
        }
      }
    }
  }
  setTarget(target) {
    this.target = target;
    let dijkstra = new Dijkstra(
      this.grid,
      this.grid[this.row][this.column],
      this.sigth
    );
    let shortestPath = dijkstra.getNodesInShortestPathOrder(target);
    console.log(shortestPath);
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
    document
      .getElementById(`node-${this.row}-${this.column}`)
      .classList.remove(this.animalType);
    if (row == -1 && this.row > 0) this.row--;
    if (row === 1 && this.row < this.grid.length - 1) this.row++;
    if (column === 1 && this.column < this.grid[0].length - 1) this.column++;
    if (column == -1 && this.column > 0) this.column--;

    document
      .getElementById(`node-${this.row}-${this.column}`)
      .classList.add(this.animalType);
  }
}
