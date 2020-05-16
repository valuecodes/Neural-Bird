import Bird from '../Simulation/animation/bird'

let alfa={score:0};

export function nextGeneration(birds,options,generationalData,currentRound) {
    let {mutateRate,neuralNetwork}=options;
    let totalFitness=calculateFitness(birds);
    let createdBirds=[];
    let oldGen=generationalData.generationData.currentGeneration;
    let newGen=[];

    if(birds[0].fitness>=0.098){
      mutateRate=0.99;
    }

    for(var w=0;w<birds.length;w++){
      let parent1=selectParentOne(birds);
      let brain='';
      if(currentRound>100){
        brain=parent1.bird.brain.copy();
      }
      createdBirds.push(new Bird(neuralNetwork,brain))
      let parent2=selectParentTwo(birds,parent1);
      createdBirds[w].brain.shuffleGenes(parent2.bird);
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
        parent1.data[0],
        parent2.data[0],
      ])
    } 

    generationalData.generationData.oldGenerations.unshift(oldGen);
    generationalData.generationData.currentGeneration=newGen;

    let dna=birds[birds.length-1].brain.getDNA()
    return {
      birds:createdBirds,
      fitness:totalFitness,
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