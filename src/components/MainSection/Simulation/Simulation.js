import React,{useState,useEffect,useContext} from 'react'
import Bird from './animation/bird'
import Pipe from './animation/pipe'
import NeuralNetwork from './NeuralNetwork'
import Options from './options/Options'
import SpeedInput from './options/SpeedInput'
import SimulationStats from './options/SimulationStats'
import {GlobalContext} from '../../../context/GlobalState'


export default function Simulation() {

    const canvasRef = React.useRef(null)

    const [draw,setDraw]=useState([]);
    const [speed,setSpeed]=useState(1);
    const [initialPopulation,setInitialPopulation]=useState(10)
    const [pause,setPause]=useState(true);
    const [state,setState]=useState('Offline')
    const [gapWidth,setGapWidth]=useState(100);
    const [savedPipes,setPipes]=useState([]);
    const [savedBirds,setBirds]=useState([]);
    const [savedCopy,setCopy]=useState(null)
    const [savedGeneration,setGeneration]=useState(1)
    const [savedCurrentRound,setCurrentRound]=useState(0)
    const [savedScoreCount,setScoreCount]=useState(0)

    const { setGlobalState } =useContext(GlobalContext);

    useEffect(() => {
        // startSimulation(speed,gapWidth,false);
        setupAnimation();
    }, [])

    function startSimulation(speed,gapWidth,reset){

        setPause(false);
        if(!reset){
            setState('Online')
        }
        
        cancelAnimationFrame(draw);

        // Create first Pipe
        let pipes=savedPipes;
        if(pipes.length===0||reset){
            pipes=[];
            pipes.push(new Pipe(300))
        }
        
        let population=initialPopulation

        // Create Birds
        function createBirds(nn){
            let createdBirds=[]
            for(var w=0;w<population;w++){
                createdBirds.push(new Bird('',speed))
                createdBirds[w].y=Math.random()*400+ 100;
            }      
            return createdBirds  
        }        

        let birds=savedBirds;

        if(birds.length===0||reset){
            birds=[];
            birds=createBirds();
        }

        let scoreCount=reset?0:savedScoreCount;
        let currentRound=reset?0:savedCurrentRound;
        let generation=reset?0:savedGeneration;
        let copy=reset?null:savedCopy;

        async function newDraw(){


            for(var q=0;q<speed;q++){

                let difficulty=currentRound/15;
                let padding=0;
                
                if(difficulty>500){
                    difficulty=500;
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

                for(var b=0;b<birds.length;b++){
                    birds[b].update(speed);
                    let choice=await birds[b].think(pipes[0],gapWidth);
                    if(choice[0]<0.5){
                        birds[b].up()
                    }
                    if(birds[b].x>pipes[0].x-10&&birds[b].x<pipes[0].x+10){
                        if(birds[b].y<pipes[0].gap||birds[b].y>pipes[0].gap+gapWidth){
                            birds[b].alive=false;
                        }
                    }
                }

                let newBirds=[...birds]
                newBirds= newBirds.filter(bird=>bird.alive===true);
                birds=newBirds;

                if(birds.length===1&&scoreCount>2000){
                    copy=birds[0].brain.copy()
                    // console.log(copy);
                    // if(speed>20){
                    //     speed=3;
                    // }
                    // scoreCount=0;

                }

                if(birds.length<1){
                    if(copy===null){
                        birds=createBirds('')
                    }else{
                        birds=[new Bird(copy)]
                    }   
                    pipes=[];
                    pipes.push(new Pipe(300))
                    currentRound=0;
                    scoreCount=0;
                    generation++;
                }
                currentRound++;
                scoreCount++;
            }

            animation(birds,pipes,generation,currentRound,scoreCount,copy)
            if(speed>0){
                setDraw(requestAnimationFrame(newDraw))
            }
        }
        newDraw();
    }

    function animation(birds,pipes,generation,currentRound,scoreCount,copy){        
        const canvas=canvasRef.current
        const ctx=canvas.getContext('2d')
        ctx.beginPath(0,0);
        ctx.clearRect(0, 0, 800, 800);

        for(var b=0;b<birds.length;b++){
            ctx.rect(...birds[b].getPosition());
        }

        for(var i=0;i<pipes.length;i++){
            ctx.rect(...pipes[i].getTopPipe(gapWidth));
            ctx.rect(...pipes[i].getBotPipe(gapWidth));
        }
        
        ctx.stroke();   
        setBirds(birds);
        setPipes(pipes)
        setGeneration(generation)
        setCurrentRound(currentRound)
        setScoreCount(scoreCount)
        setCopy(copy)
    }

    const setupAnimation=()=>{

        const canvas=canvasRef.current
        const ctx=canvas.getContext('2d')

        let pipes=[];
        pipes.push(new Pipe(300))

        let population=initialPopulation

        // Create Birds
        function createBirds(nn){
            let createdBirds=[]
            for(var w=0;w<population;w++){
                createdBirds.push(new Bird('',speed))
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
            ctx.rect(...pipes[i].getTopPipe(gapWidth));
            ctx.rect(...pipes[i].getBotPipe(gapWidth));
        }
        ctx.stroke();  
    }

    function stop(){
        cancelAnimationFrame(draw);
    }

    function changeSpeed(e){
        setSpeed(e.target.value)
        if(state!=='Offline') startSimulation(e.target.value,gapWidth,false)
        else setupAnimation();
    }

    function click(e){
        // const canvas=canvasRef.current
        // const ctx=canvas.getContext('2d')
        // const rect = canvas.getBoundingClientRect()
        // console.log('clicked');
    }

    function changeGapWidth(e){
        let newSpeed=pause===true?0:speed;
        setGapWidth(200-(e.target.value*2));
        if(state!=='Offline') startSimulation(newSpeed,200-(e.target.value*2),false)
        else setupAnimation();
    }

    const pauseSimulation=()=>{
        let newSpeed=pause===false?0:speed;
        startSimulation(newSpeed,gapWidth,false);
        setPause(!pause)

        setState(pause?'Online':'Paused')
    }

    const resetSimulation=()=>{
        setPause(false);
        setPipes([]);
        setBirds([]);
        setCopy(null);
        setGeneration(0);
        setCurrentRound(0);
        setScoreCount(0);
        setState('Offline')
        startSimulation(0,100,true);
    }

    const changePopulationSize=(e)=>{
        let population=e.target.value*2;
        setInitialPopulation(population)
        if(state!=='Offline') startSimulation(speed,e.target.value*5,false)
        else setupAnimation();
    }

    return (
        <div className='neuralNetwork' onClick={(e)=>click(e)}>
            <Options
                speed={speed}
                gapWidth={gapWidth}
                initialPopulation={initialPopulation}
                startSimulation={startSimulation}
                pauseSimulation={pauseSimulation}
                resetSimulation={resetSimulation}
                changeSpeed={changeSpeed}
                changeGapWidth={changeGapWidth}
                changePopulationSize={changePopulationSize}
 
                state={state}             
            />            
            <SimulationStats
                generation={savedGeneration}
                count={savedBirds.length}
                scoreCount={savedScoreCount}
                initialPopulation={initialPopulation}  
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

