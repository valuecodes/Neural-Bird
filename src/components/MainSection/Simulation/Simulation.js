import React,{useState,useEffect,useContext} from 'react'
import Bird from './animation/bird'
import Pipe from './animation/pipe'
import Options from './options/Options'
import SpeedInput from './options/SpeedInput'
import {nextGeneration} from './NextGeneration'
import {GlobalContext} from '../../../context/GlobalState'
import {GlobalOptions} from '../../../context/GlobalOptions'
import {GlobalGenerational} from '../../../context/GlobalGenerational'
import {GlobalInOut} from '../../../context/GlobalInOut'

export default function Simulation() {
    const {options}=useContext(GlobalOptions);
    const {setGlobalInOutData}=useContext(GlobalInOut)    
    const {
        setGenerationalData,
        generationalData,
        resetGenerationalData
    }=useContext(GlobalGenerational)
    const { setGlobalSimulationState,visual }=useContext(GlobalContext);

    let currentAnimation=React.useRef(null)
    const canvasRef = React.useRef(null)
    const statCanvasRef = React.useRef(null)
    const [mainCanvas,setMainCanvas]=useState(null);
    const [statCanvas,setStatCanvas]=useState(null);
    const [speed,setSpeed]=useState(1);
    const [pause,setPause]=useState(true);
    const [state,setState]=useState('Offline')

    let savedData=React.useRef({
        gapWidth:100,
        pipes:[],
        birds:[],
        generation:[1],
        currentRound:0,
        scoreCount:0,
        roundScore:[],
        totalRoundScore:[],
        deadBirds:[],
    });    

    useEffect(()=>{
        const canvas=canvasRef.current;
        const ctx=canvas.getContext('2d');
        const statCanvas = statCanvasRef.current;
        const statctx=statCanvas.getContext('2d');
        setStatCanvas(statctx)
        setMainCanvas(ctx);
    },[])

    useEffect(()=>{
        if(state!=='Offline'&&state!=='Paused') simulation(speed,false)
    },[visual])

    useEffect(() => {
        setupAnimation();
    }, [options.gapWidth,options.population])

    function simulation(speed,reset){   
        let {
            birds,
            pipes,
            gapWidth,
            scoreCount,
            currentRound,
            generation,
            deadBirds,
            roundScore,
            totalRoundScore
        }=savedData.current

        let {
            closingRate,
            population,
            hardness,
            pipeRate,
            choiceRate,
        }=options

        let inputData=null;
        
        setPause(false);
        if(!reset){
            setState('Online')
            setGlobalSimulationState('Online')
        }
        cancelAnimationFrame(currentAnimation.current);

        if(pipes.length===0||reset){
            pipes=[];
            pipes.push(new Pipe(300))
        }
        function createBirds(nn){
            let createdBirds=[]
            for(var w=0;w<population;w++){
                createdBirds.push(new Bird(options.neuralNetwork,''))
                createdBirds[w].y=Math.random()*400+ 100;
            }      
            return createdBirds  
        }        

        if(birds.length===0||reset){
            birds=[];
            birds=createBirds();
        }

        async function simulationLoop(){
            for(var q=0;q<speed;q++){

                let difficulty=currentRound/hardness;
                if(difficulty>400) difficulty=400;

                if(scoreCount%closingRate===0){
                    if(gapWidth>10) gapWidth--;
                }
                
                if(currentRound%pipeRate===0){
                    pipes.push(new Pipe(Math.floor(Math.random()*difficulty+(300-difficulty/2))))
                }

                for(var i=0;i<pipes.length;i++){
                    pipes[i].update();
                    if(pipes[0].x<-10) pipes.shift();
                }
                
                for(var b=0;b<birds.length;b++){
                    birds[b].update();
                    let currentPipe=pipes[0].x>10?pipes[0]:pipes[1];
                    let nndata=await birds[b].think(currentPipe,gapWidth);
                    let choice=nndata.outputData

                    if(b===0&&speed<5){
                        inputData=nndata.inputData;
                        inputData.push(choice[0]); 
                        if(visual==='bird') setGlobalInOutData(inputData);
                    }

                    if(choice[0]<choiceRate/100) birds[b].up();

                    if(birds[b].x>pipes[0].x){
                        if(birds[b].y<pipes[0].gap-gapWidth||birds[b].y>pipes[0].gap+gapWidth){
                            birds[b].alive=false;
                        }
                    }
                }
                let newBirds=[];
                for(var x=0;x<birds.length;x++){                        
                    if(birds[x].alive) newBirds.push(birds[x]);
                    else deadBirds.push(birds[x])
                };
                birds=newBirds;

                if(birds.length<1){
                    let data=nextGeneration(deadBirds,options,generationalData,currentRound)
                    birds=data.birds;
                    pipes=[];
                    deadBirds=[];
                    pipes.push(new Pipe(300))
                    roundScore.push(currentRound)
                    totalRoundScore.push(data.fitness);
                    currentRound=0;
                    scoreCount=0;
                    generation++;
                    gapWidth=options.gapWidth
                    setGenerationalData(
                        roundScore,
                        totalRoundScore,
                        data.dna,
                        data.generationData.generationData
                    )
                }
                currentRound++;
                scoreCount++;
                savedData.current={
                    birds,
                    pipes,
                    generation,
                    currentRound,
                    scoreCount,
                    gapWidth,
                    deadBirds,
                    roundScore,
                    totalRoundScore
                }
            }
            mainAnimation(birds,pipes,gapWidth,inputData)
            displayRoundStats(savedData,population);    
            if(speed>0){
                currentAnimation.current=requestAnimationFrame(simulationLoop)
            }
        }
        simulationLoop();
    }
    
    function mainAnimation(birds,pipes,gapWidth,inputData){
        resetCanvas(mainCanvas)
        mainCanvas.strokeStyle = "#000000";
        for(var b=0;b<birds.length;b++){
            mainCanvas.rect(...birds[b].getPosition());
        }
        for(var i=0;i<pipes.length;i++){
            mainCanvas.rect(...pipes[i].getTopPipe(gapWidth));
            mainCanvas.rect(...pipes[i].getBotPipe(gapWidth));
        }
        mainCanvas.stroke();
        if(visual==='bird'&&speed<5&&inputData!==null){
            displayBirdView(inputData);
        }
    }

    const displayRoundStats=(data,population)=>{
        const {generation,birds,scoreCount,gapWidth}=data.current

        resetCanvas(statCanvas);
        statCanvas.font = "20px Arial ";
        statCanvas.fontColor = "20px Arial";
        statCanvas.fillStyle = 'rgb(114, 114, 114)';
        statCanvas.fillText('Generation:', 10, 35);  
        statCanvas.fillText('Bird Count:', 10, 65); 
        statCanvas.fillText('Score:', 10, 95); 
        statCanvas.fillText('Gap Width:', 10, 125); 

        statCanvas.font = "700 26px Arial";
        statCanvas.fillStyle = 'rgb(55, 61, 80)';
        statCanvas.fillText(generation, 130, 35);
        statCanvas.fillText(`${birds.length}/${population}`, 130, 65);
        statCanvas.fillText(scoreCount, 130, 95);
        statCanvas.fillText(gapWidth, 130, 125);  
    }

    const resetCanvas=(ctx)=>{
        ctx.beginPath(0,0);
        ctx.clearRect(0, 0, 800, 800);
    }

    const displayBirdView=(inputData)=>{  
        mainCanvas.beginPath(0,0);
        mainCanvas.strokeStyle = "#FF0000";
        mainCanvas.rect(inputData[3]*600-5,inputData[2]*600-15,30,30)
        mainCanvas.rect(inputData[3]*600-5,inputData[1]*600-15,30,30)
        mainCanvas.rect(20-5,inputData[0]*600-5,20,20)
        mainCanvas.rect(20+30,inputData[0]*600+5,0,-20+inputData[4]*120)
        mainCanvas.stroke();
    }

    const setupAnimation=()=>{
        const canvas=canvasRef.current
        const ctx=canvas.getContext('2d')
        let pipes=[];
        pipes.push(new Pipe(300))
        let population=options.population
        function createBirds(nn){
            let createdBirds=[]
            for(var w=0;w<population;w++){
                createdBirds.push(new Bird(options.neuralNetwork,''))
                createdBirds[w].y=Math.random()*400+ 100;
            }      
            return createdBirds  
        }        
        let birds=createBirds();
        ctx.beginPath(0,0);
        ctx.clearRect(0, 0, 800, 800);
        for(var b=0;b<birds.length;b++){
            ctx.rect(...birds[b].getPosition());
        }
        for(var i=0;i<pipes.length;i++){
            ctx.rect(...pipes[i].getTopPipe(options.gapWidth));
            ctx.rect(...pipes[i].getBotPipe(options.gapWidth));
        }
        ctx.stroke();  
    }

    function changeSpeed(e){
        setSpeed(e.target.value)
        if(state!=='Offline') simulation(e.target.value,false)
        else setupAnimation();
    }

    const startSimulation=()=>{
        simulation(speed,false)
    }

    const pauseSimulation=()=>{
        let newSpeed=pause===false?0:speed;
        simulation(newSpeed,false);
        setPause(!pause)
        setState(pause?'Online':'Paused')
        setGlobalSimulationState(pause?'Online':'Paused')
    }

    const resetSimulation=()=>{
        savedData.current={
            gapWidth:options.gapWidth,
            pipes:[],
            birds:[],
            generation:[1],
            currentRound:0,
            scoreCount:0,
            roundScore:[],
            totalRoundScore:[],
            deadBirds:[],
        };
        resetGenerationalData();
        setPause(false);
        setState('Offline')
        setGlobalSimulationState('Offline')
        simulation(0,true);
        resetCanvas(statCanvas);
    }

    return (
        <div className='neuralNetwork'>
            <Options
                speed={speed}
                startSimulation={startSimulation}
                pauseSimulation={pauseSimulation}
                resetSimulation={resetSimulation}
                changeSpeed={changeSpeed}
                state={state}    
                generation={savedData.current.generation}
                count={savedData.current.birds.length}
                scoreCount={savedData.current.scoreCount}
                currentGapWidth={savedData.current.gapWidth}  
                population={options.population}
            />            
            <SpeedInput
                speed={speed}
                changeSpeed={changeSpeed}
            />
            <canvas
                ref={canvasRef}
                className='canvas'
                width={600}
                height={600}
            >
            </canvas>
            <canvas
                ref={statCanvasRef}
                className='statCanvas'
                width={200}
                height={state==='Offline'?0:150}
            >
            </canvas>
        </div>
    )
}

