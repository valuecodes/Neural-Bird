import Bird from '../Simulation/animation/bird'

let alfa={score:0};

export function nextGeneration(birds,options,generationalData,currentRound,generation) {
    let {
      mutateRate,
      neuralNetwork,
      recreateRate,
      population
    }=options;

    let aScore=alfa.score;
    let pool=calculateFitness(birds,options); 
    let createdBirds=[],newGen=[];

    let oldGen=generationalData.generationData.currentGeneration;
    if(birds[0].fitness>=0.098) mutateRate=0.99;

    for(var w=0;w<population;w++){
      let parentOne=selectParentOne(pool.birds);
      let brain='';
      if(currentRound>recreateRate) brain=parentOne.bird.brain.copy();
      createdBirds.push(new Bird(neuralNetwork,brain,w))
      let parentTwo=selectParentTwo(pool.birds,parentOne);
      createdBirds[w].brain.shuffleGenes(parentTwo.bird);
      createdBirds[w].brain.mutate(mutateRate,alfa);
      if(generationalData.generationData.currentGeneration.length!==0){
          oldGen[w].fitness=birds[w].fitness;
          oldGen[w].score=birds[w].score;
          oldGen[w].currentRound=currentRound;
          oldGen[w].generation=generation;
      }
      newGen.push({
        birdID:`${birds[w].id}.${generation}`,
        parent1:`${parentOne.data[0]}.${generation-1}`,
        parent2:`${parentTwo.data[0]}.${generation-1}`,
      })
    } 

    generationalData.generationData.oldGenerations.unshift(oldGen);
    generationalData.generationData.currentGeneration=newGen;
  
    let dna=birds[birds.length-1].brain.getDNA()
    let alfaDNA=alfa.brain.getDNA()
    alfa.weights=alfaDNA;

    return {
      birds:createdBirds,
      fitness:pool.sum,
      dna:dna,
      generationData:generationalData,
      alfa:aScore<alfa.score?alfa:null
    }
  }


  function selectParentOne(birds){
    let found=false;
    while(!found){
      for(var i=0;i<birds.length;i++){
        if(Math.random()<birds[i].fitness){
            found=true;
            return {
              bird:birds[i],
              data:[i,birds[i].score,birds[i].fitness]
            };
        }
      }         
    }
  }

  function selectParentTwo(birds,parent1){
    let found=false;
    while(!found){
      for(var i=0;i<birds.length;i++){
        if(i===parent1.id) continue
        if(Math.random()<birds[i].fitness){
            found=true;
            return {
              bird:birds[i],
              data:[i,birds[i].score,birds[i].fitness]
            };
        }
      }         
    }
  }

  function calculateFitness(birds,options) {
    const {selectionPower,poolSize}=options
    let pool=birds.slice(birds.length-poolSize,birds.length);
    let sum = 0;
    for (let z=0;z<pool.length;z++) {
      let birdScore=pool[z].score
      sum += Math.pow(birdScore,selectionPower);
      if(pool[z].score>=alfa.score){
        alfa=pool[z];
      }
    }

    for (let a=0;a<pool.length;a++) {
      pool[a].fitness = Math.pow(pool[a].score,selectionPower)/sum;
    }

    return {
      sum:sum,
      birds:pool
    };
  }