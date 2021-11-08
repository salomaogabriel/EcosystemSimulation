let numberOfGenes = 1;
export default class Genes {
  constructor(mutation = 0.2, male = [], female = []) {
    this.mutation = mutation;
    this.parentMale = male;
    this.parentFemale = female;
    this.crossoverPoint = Math.floor(Math.random() * numberOfGenes);
    this.speedGene = 0;
    this.maxHungryGene = 0;
    this.maxThirstyGene = 0;
    this.maxAgeGene = 0;
    this.maxSightGene = 0;
  }
  getGenes() {
    return [this.speedGene];
  }
}
