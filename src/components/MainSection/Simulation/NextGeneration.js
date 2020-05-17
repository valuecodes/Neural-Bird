import Bird from '../Simulation/animation/bird'

let alfa={score:0};

export function nextGeneration(birds,options,generationalData,currentRound) {
    let {
      mutateRate,
      neuralNetwork,
      poolSize,
      recreateRate,
      population
    }=options;

    let pool=calculateFitness(birds,options); 
    let createdBirds=[],newGen=[];
    let oldGen=generationalData.generationData.currentGeneration;
    if(birds[0].fitness>=0.098) mutateRate=0.99;

    for(var w=0;w<population;w++){
      let parentOne=selectParentOne(pool.birds);
      let brain='';
      if(currentRound>recreateRate) brain=parentOne.bird.brain.copy();
      createdBirds.push(new Bird(neuralNetwork,brain))

      let parentTwo=selectParentTwo(pool.birds,parentOne);
      createdBirds[w].brain.shuffleGenes(parentTwo.bird);
      createdBirds[w].brain.mutate(mutateRate,alfa);

      if(generationalData.generationData.currentGeneration.length!==0){
        oldGen[w]=[
          ...oldGen[w],        
          w,
          birds[w].fitness,
          birds[w].score
        ]        
      }
      newGen.push([
        parentOne.data[0],
        parentTwo.data[0],
      ])
    } 

    generationalData.generationData.oldGenerations.unshift(oldGen);
    generationalData.generationData.currentGeneration=newGen;

    let dna=birds[birds.length-1].brain.getDNA()

    return {
      birds:createdBirds,
      fitness:pool.sum,
      dna:dna,
      generationData:generationalData
    }
  }

  function selectParentOne(birds){
    let found=false;
    while(!found){
      for(var i=0;i<birds.length;i++){
        if(Math.random()<birds[i].fitness){
            found=true;
            // return birds[i].brain.copy()
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
    console.log(pool,birds);
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