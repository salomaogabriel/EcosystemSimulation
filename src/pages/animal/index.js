import Genes from "../genes";

export default class Animal {
  constructor(column = 0, row = 0, diet = "plant") {
    //position
    this.column = column;
    this.row = row;
    //information
    this.diet = diet;
    this.age = 0;
    this.hungry = 0;
    this.maxHungry = 100;
    this.maxThirsty = 100;
    this.thirsty = 0;
    this.urgeToReproduce = 0;
    this.sex = "male";
    let newGenes = new Genes(0.2);
    this.genes = newGenes.getGenes();
    this.speed = 15;
    this.sigth = 0;
    this.curAction = "";
    this.isAlive = true;
  }
}
