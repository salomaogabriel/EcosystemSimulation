import Genes from "../genes";
import Dijkstra from "../../dijkstra/index";

export default class Animal {
  constructor(column = 0, row = 0, diet = "plant", grid) {
    //position
    this.column = column;
    this.row = row;
    this.grid = grid;
    //information
    this.diet = diet;
    this.age = 0;
    this.hungry = 0;
    this.maxHungry = 100;
    this.maxThirsty = 100;
    this.thirsty = 0;
    this.urgeToReproduce = 0;
    this.sex = Math.floor(Math.random() * 2) == 1 ? "Male" : "Female";
    this.createGenes();
    this.speed = 10;
    this.sigth = 2;
    this.curAction = "";
    this.isAlive = true;
    this.update();
  }
  createGenes() {
    let newGenes = new Genes(4, [0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1]);
    // let newGenes = new Genes(4);
    let genes = newGenes.getGenes();
    this.genes = genes;
  }
  update() {
    setInterval(() => {
      let dijkstra = new Dijkstra(
        this.grid,
        this.grid[this.row][this.column],
        this.sigth
      );
      let newGrid = dijkstra.update(
        this.grid,
        this.grid[this.row][this.column]
      );

      document
        .getElementById(`node-${this.row}-${this.column}`)
        .classList.remove("rabbit");
      if (this.row < this.grid.length - 1) {
        console.log(this.row);
        this.row++;
      }
      document
        .getElementById(`node-${this.row}-${this.column}`)
        .classList.add("rabbit");
    }, 20000 / this.speed);
  }
}
