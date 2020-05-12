import React,{useState,useEffect,useContext} from 'react'
import Bird from './animation/bird'
import Pipe from './animation/pipe'
import NeuralNetwork from './NeuralNetwork'
import Options from './options/Options'
import SpeedInput from './options/SpeedInput'
import SimulationStats from './options/SimulationStats'
import {GlobalContext} from '../../../context/GlobalState'
import {nextGeneration} from './NextGeneration'

export default function Simulation() {
    
    const { setGlobalState,setGlobalRoundScore,setGlobalRoundTotalScore } =useContext(GlobalContext);
    const canvasRef = React.useRef(null)

    const [draw,setDraw]=useState([]);
    const [speed,setSpeed]=useState(1);
    const [initialPopulation,setInitialPopulation]=useState(20)
    const [pause,setPause]=useState(true);
    const [state,setState]=useState('Offline')
    const [gapWidth,setGapWidth]=useState(100);
    const [initialGapWidth,setInitialGapWidth]=useState(100);
    const [closingRate,setClosingRate]=useState(500);
    const [mutateRate,setMutateRate]=useState(0.1);
    const [savedPipes,setPipes]=useState([]);
    const [savedBirds,setBirds]=useState([]);
    const [savedCopy,setCopy]=useState(null)
    const [savedGeneration,setGeneration]=useState(1)
    const [savedCurrentRound,setCurrentRound]=useState(0)
    const [savedScoreCount,setScoreCount]=useState(0)
    const [savedRoundScore,setRoundScore]=useState([])
    

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
                createdBirds.push(new Bird(''))
                createdBirds[w].y=Math.random()*400+ 100;
            }      
            return createdBirds  
        }        
        
        let birds=savedBirds;

        if(birds.length===0||reset){
            birds=[];
            birds=createBirds();
        }
        // let closingRate=closingRate;
        let scoreCount=reset?0:savedScoreCount;
        let currentRound=reset?0:savedCurrentRound;
        let generation=reset?0:savedGeneration;
        let copy=reset?null:savedCopy;
        let generationTop10=[];
        async function newDraw(){
            for(var q=0;q<speed;q++){

                let difficulty=currentRound/20;
                let padding=0;
                
                if(difficulty>400){
                    difficulty=400;
                }             

                if(scoreCount%closingRate==0){
                    if(gapWidth>10){
                        gapWidth--
                    }   
                }

                // gapWidth*=0.9999
                // console.log(gapWidth,closingRate)

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
                    let choice=await birds[b].think(pipes[0],gapWidth);
                    if(choice[0]<0.5){
                        birds[b].up()
                    }
                    // console.log(birds[b].x,pipes[0].x)
                    if(birds[b].x>pipes[0].x
                        // &&birds[b].x<pipes[0].x+10
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
                        if(birds.length<=10){
                            generationTop10.push(birds[x])
                        }
                    }
                };
                birds=newBirds;

                if(birds.length<1){
                    if(generationTop10.length===0){
                        birds=createBirds()
                    }else{
                        let data=nextGeneration(generationTop10,initialPopulation,mutateRate)
                        birds=data.birds;
                        setGlobalRoundTotalScore(data.fitness)
                    }
                    // if(copy===null){
                        

                    // }else{
                    //     birds=[new Bird(copy)]
                    // }  

                    pipes=[];
                    pipes.push(new Pipe(300))
                    setRoundScore([...savedRoundScore,currentRound]);
                    setGlobalRoundScore(currentRound)
                    currentRound=0;
                    scoreCount=0;
                    generation++;
                    generationTop10=[]
                    gapWidth=initialGapWidth
                }
                currentRound++;
                scoreCount++;
            }
            
            animation(birds,pipes,generation,currentRound,scoreCount,copy,gapWidth)
            if(speed>0){
                setDraw(requestAnimationFrame(newDraw))
            }
        }
        
        newDraw();
    }
    
    function animation(birds,pipes,generation,currentRound,scoreCount,copy,gapWidth){        
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
        setGapWidth(gapWidth)
        setGlobalState(scoreCount)
    }

    const setupAnimation=()=>{

        const canvas=canvasRef.current
        const ctx=canvas.getContext('2d')

        let pipes=[];
        pipes.push(new Pipe(300))
        pipes[0].x=300;

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
        setInitialGapWidth(200-(e.target.value*2));
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

    const changeClosingRate=(e)=>{
        setClosingRate(e.target.value)
    }

    const changeMutateRate=(e)=>{
        setMutateRate(e.target.value/100);
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
                closingRate={closingRate} 
                changeClosingRate={changeClosingRate}  
                mutateRate={mutateRate}
                changeMutateRate={changeMutateRate}     
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

