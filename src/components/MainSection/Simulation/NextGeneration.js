import Bird from '../Simulation/animation/bird'

let alfa={score:0};

export function nextGeneration(birds,population,mutateRate,nnForm) {

    let totalFitness=calculateFitness(birds);

    // let familyTree=[];
    // let createdBirds=[];
    // for(var w=0;w<population;w++){
    //   let data=pickOne(birds);
    //   createdBirds.push(new Bird(nnForm,data.bird))
    //   let otherParent=selectOtherParent(birds);
    //   createdBirds[w].brain.shuffleGenes(otherParent.bird);
    //   createdBirds[w].brain.mutate(mutateRate,alfa);
    //   familyTree.push({parent1:data.id,paoe});
    // } 

    // console.log(familyTree);
    // let dna=birds[birds.length-1].brain.getDNA()





    let createdBirds=[];
    for(var w=0;w<population;w++){
      let data=pickOne(birds);
      createdBirds.push(new Bird(nnForm,data.bird))
      let otherParent=selectOtherParent(birds);
      createdBirds[w].brain.shuffleGenes(otherParent.bird);
      createdBirds[w].brain.mutate(mutateRate,alfa);
    } 
    let dna=birds[birds.length-1].brain.getDNA()

    return {
      birds:createdBirds,
      fitness:totalFitness,
      dna:dna
    }
  }

  function selectOtherParent(birds,w){
    let selectedBird=null;
    let index;
    for(var i=birds.length-1;i>0;i--){
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
    // console.log(index,birds.length-1)
    // if(index===w){
    //   selectedBird= birds[Math.floor(Math.random()*birds.length)];
    // }
    let otherParent={
      bird:selectedBird,
      id:index
    }
    return otherParent
  }

  function shuffleGenes(currentBird,birds){
    let randomBird= birds[Math.floor(Math.random()*birds.length)];
  }
  
  function pickOne(birds) { 
    let selectedBird=null;
    let index=null;
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
    let data={
      bird:selectedBird.brain.copy(),
      id:index
    }
    return data;
  }
  
  function calculateFitness(birds) {
    let pow=1;
    let sum = 0;
    for (let z=0;z<birds.length;z++) {
      let birdScore=birds[z].score
      sum += Math.pow(birdScore,pow);
      if(birds[z].score>=alfa.score){
        alfa=birds[z];
      }
    }

    for (let a=0;a<birds.length;a++) {
      birds[a].fitness = Math.pow(birds[a].score,pow)/sum;
    }

    return sum;
  }