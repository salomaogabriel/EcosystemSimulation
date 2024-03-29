let numberOfGenes = 6;
export default class Genes {
  constructor(mutation = 4, male = [], female = []) {
    this.mutation = mutation;
    this.parentMale = male;
    this.parentFemale = female;
    this.crossoverPoint = Math.floor(Math.random() * numberOfGenes);
    this.speedGene = Math.floor(Math.random() * 2);
    this.maxHungryGene = Math.floor(Math.random() * 2);
    this.maxThirstyGene = Math.floor(Math.random() * 2);
    this.maxAgeGene = Math.floor(Math.random() * 2);
    this.maxSightGene = Math.floor(Math.random() * 2);
    this.desirebilityGene = Math.floor(Math.random() * 2);
    this.genes = [
      this.speedGene,
      this.maxHungryGene,
      this.maxThirstyGene,
      this.maxAgeGene,
      this.maxSightGene,
      this.desirebilityGene,
    ];
  }
  getGenes() {
    if (this.parentMale.length < 1 || this.parentFemale.length < 1) {
      return this.genes;
    } else {
      try {
        this.crossover();
        this.mutate();
        return this.genes;
      } catch (err) {
        console.error(err);
        return [0, 0, 0, 0, 0];
      }
    }
  }
  mutate() {
    for (let index = 0; index < this.genes.length; index++) {
      let randomPossibility = Math.floor(Math.random() * 100);
      const gene = this.genes[index];
      if (randomPossibility < this.mutation) {
        if (gene === 0) {
          this.genes[index] = 1;
        } else {
          this.genes[index] = 0;
        }
      }
    }
  }
  crossover() {
    let parentOrder = Math.floor(Math.random() * 2);
    //male first then female
    if (parentOrder == 0) {
      var genesBeforeCrossover = this.parentMale.slice(0, this.crossoverPoint);

      var genesAfterCrossover = this.parentFemale.slice(
        this.crossoverPoint,
        this.genes.length
      );

      this.genes = genesBeforeCrossover.concat(genesAfterCrossover);
    }
    //female first then male
    else {
      var genesBeforeCrossover = this.parentFemale.slice(
        0,
        this.crossoverPoint
      );

      var genesAfterCrossover = this.parentMale.slice(
        this.crossoverPoint,
        this.genes.length
      );

      this.genes = genesBeforeCrossover.concat(genesAfterCrossover);
    }
  }
}
