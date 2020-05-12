import Bird from '../Simulation/animation/bird'

let alfa={score:0};

export function nextGeneration(birds,population,mutateRate) {

    let totalFitness=calculateFitness(birds);

    let createdBirds=[];
    for(var w=0;w<population;w++){
      let copy=pickOne(birds);
      createdBirds.push(new Bird(copy))
      let otherParent=selectOtherParent(birds);
      createdBirds[w].brain.shuffleGenes(otherParent);
      createdBirds[w].brain.mutate(mutateRate,alfa);
    } 
    return {
      birds:createdBirds,
      fitness:totalFitness
    }
  }

  function selectOtherParent(birds,w){
    let selectedBird=null;
    let index;
    for(var i=0;i<birds.length;i++){
      if(Math.random()<birds[i].fitness){
          selectedBird=birds[i];
          index=i;
      }
    }
    if(selectedBird===null){
      let r=Math.floor(Math.random()*birds.length);
      selectedBird=birds[r];
      index=r;
    }
    if(index===w){
      selectedBird= birds[Math.floor(Math.random()*birds.length)];
    }
    return selectedBird
  }

  function shuffleGenes(currentBird,birds){
    let randomBird= birds[Math.floor(Math.random()*birds.length)];
  }
  
  function pickOne(birds) { 
    let selectedBird=null;
    for(var i=0;i<birds.length;i++){
      if(Math.random()<birds[i].fitness){
          selectedBird=birds[i];
      }
    }
    if(selectedBird===null){
      let r=Math.floor(Math.random()*birds.length);
      selectedBird=birds[r];
    }
    return selectedBird.brain.copy();
  }
  
  function calculateFitness(birds) {
    let sum = 0;
    for (let z=0;z<birds.length;z++) {
      sum += birds[z].score;
      if(birds[z].score>=alfa.score){
        alfa=birds[z];
      }
    }

    for (let a=0;a<birds.length;a++) {
      birds[a].fitness = birds[a].score / sum;
    }

    return sum;
  }