import React,{useState,useEffect,useContext,useRef} from 'react'
import Bird from './animation/bird'
import Pipe from './animation/pipe'
import Options from './options/Options'
import SpeedInput from './options/SpeedInput'
import {nextGeneration} from './NextGeneration'
import {GlobalContext} from '../../../context/GlobalState'
import {GlobalOptions} from '../../../context/GlobalOptions'
import {GlobalGenerational} from '../../../context/GlobalGenerational'
import {GlobalInOut} from '../../../context/GlobalInOut'
import { func } from '@tensorflow/tfjs-data';

export default function Simulation() {
    
    const { 
        setGlobalState,
        setGlobalSimulationState,
        visual,
    }=useContext(GlobalContext);

    const {options}=useContext(GlobalOptions);
    const {setGenerationalData,generationalData,resetGenerationalData}=useContext(GlobalGenerational)
    const {setGlobalInOutData}=useContext(GlobalInOut)

    const inputOutput=React.useRef(useContext(GlobalInOut))

    const canvasRef = React.useRef(null)
    let canimation=React.useRef(null)

    const [draw,setDraw]=useState([]);
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
        if(state!=='Offline'&&state!=='Paused') simulation(speed,false)
    },[visual])

    useEffect(() => {
        let updatedSavedData={...savedData};
        updatedSavedData.gapWidth=options.gapWidth;
        // savedData.current={updatedSavedData};
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

        setPause(false);
        if(!reset){
            setState('Online')
            setGlobalSimulationState('Online')
        }

        cancelAnimationFrame(canimation.current);

        // Create first Pipe
       
        if(pipes.length===0||reset){
            pipes=[];
            pipes.push(new Pipe(300))
        }

        let population=options.population

        // Create Birds
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

        let inputData=null;
        async function newDraw(){
            for(var q=0;q<speed;q++){
                let difficulty=currentRound/20;
                if(difficulty>400){
                    difficulty=400;
                }             

                if(scoreCount%options.closingRate===0){
                    if(gapWidth>10){
                        gapWidth--
                    }   
                }

                // Pipes
                if(pipes[0].x<300&&pipes.length<2){
                    pipes.push(new Pipe(
                        Math.floor(Math.random()*difficulty+(300-difficulty/2))
                        // Math.floor(Math.random()*difficulty+(200-difficulty/2)+300)
                    ))
                }
                for(var i=0;i<pipes.length;i++){
                    pipes[i].update();
                }
                // Remove pipe when it reaches off screen
                if(pipes[0].x<-10) pipes.shift();

                // console.log(`
                // Bird y ${birds[b].y} 
                // Bird y ${birds[b].y}
                // Bird y ${birds[b].y}
                // Bird y ${birds[b].y}`)

                for(var b=0;b<birds.length;b++){
                    birds[b].update();
                    let currentPipe=pipes[0].x>10?pipes[0]:pipes[1];
                    
                    let nndata=await birds[b].think(currentPipe,gapWidth);
                    let choice=nndata.outputData

                    if(b===0&&speed<5){
                        inputData=nndata.inputData;
                        inputData.push(choice[0]); 
                        if(visual==='bird'){
                            setGlobalInOutData(inputData)                             
                        }
  
                    }

                    if(choice[0]<0.55){
                        birds[b].up()
                    }
                    if(birds[b].x>pipes[0].x
                    ){
                        if(birds[b].y<pipes[0].gap-gapWidth||birds[b].y>pipes[0].gap+gapWidth){
                            birds[b].alive=false;
                        }
                    }
                }

                let newBirds=[];

                for(var x=0;x<birds.length;x++){                        
                    if(birds[x].alive){
                        newBirds.push(birds[x]);
                    }else{
                        deadBirds.push(birds[x])
                    }
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
                    setGenerationalData(roundScore,totalRoundScore,data.dna,data.generationData.generationData)
                }
                currentRound++;
                scoreCount++;
            }

            animation(birds,pipes,gapWidth,inputData)
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

            if(speed>0){
                canimation.current=requestAnimationFrame(newDraw)
                // setDraw()
            }
        }
        newDraw();
    }
    
    function animation(birds,pipes,gapWidth,inputData){   
        const canvas=canvasRef.current
        const ctx=canvas.getContext('2d')
        ctx.beginPath(0,0);
        ctx.clearRect(0, 0, 800, 800);
        ctx.strokeStyle = "#000000";

        for(var b=0;b<birds.length;b++){
            ctx.rect(...birds[b].getPosition());
        }

        for(var i=0;i<pipes.length;i++){
            ctx.rect(...pipes[i].getTopPipe(gapWidth));
            ctx.rect(...pipes[i].getBotPipe(gapWidth));
        }
        ctx.stroke();

        if(visual==='bird'&&speed<5&&inputData!==null){
            displayVisual(canvas,ctx,inputData);
        }
    }

    const displayVisual=(canvas,ctx,inputData)=>{   
        ctx.beginPath(0,0);
        ctx.strokeStyle = "#FF0000";
        ctx.rect(inputData[3]*600-5,inputData[2]*600-15,30,30)
        ctx.rect(inputData[3]*600-5,inputData[1]*600-15,30,30)
        ctx.rect(20-5,inputData[0]*600-5,20,20)
        // ctx.rect(20-5,0,0,inputData[0]*600-5)
        ctx.rect(20+30,inputData[0]*600+5,0,-20+inputData[4]*120)
        ctx.stroke();
    }

    const setupAnimation=()=>{

        let sData=savedData.current
        const canvas=canvasRef.current
        const ctx=canvas.getContext('2d')
        let pipes=[];
        pipes.push(new Pipe(300))

        let population=options.population

        // Create Birds
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
            gapWidth:100,
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
    }

    function test(){
        // console.log(1)
    }

    return (
        <div className='neuralNetwork' onChange={test()}>
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
                style={{
                    fill:'black',
                }}
            >
            </canvas>

        </div>
    )
}

