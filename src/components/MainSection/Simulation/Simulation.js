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
import svgs from './../../../utils/Utils'
import BackGround from './animation/background';
import alpha from './animation/alfaSettings.json' 

export default function Simulation() {
    const {options,modifyOptions}=useContext(GlobalOptions);
    const {setGlobalInOutData}=useContext(GlobalInOut)    
    const {
        setGenerationalData,
        generationalData,
        resetGenerationalData,
        // saveDataToServer
    }=useContext(GlobalGenerational)
    const { 
        setGlobalSimulationState,
        visual,
        activePage 
    }=useContext(GlobalContext);

    let currentAnimation=React.useRef(null)
    const canvasRef = React.useRef(null)
    const statCanvasRef = React.useRef(null)
    const [mainCanvas,setMainCanvas]=useState(null);
    const [statCanvas,setStatCanvas]=useState(null);
    const [speed,setSpeed]=useState(1);
    const [pause,setPause]=useState(true);
    const [state,setState]=useState('Offline')
    const [icon,setIcon]=useState(null)
    const [background,setBackground]=useState(null)

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
        background:new BackGround(-80),
    });    

    useEffect(()=>{
        const canvas=canvasRef.current;
        const ctx=canvas.getContext('2d');
        const statCanvas = statCanvasRef.current;
        const statctx=statCanvas.getContext('2d');
        setStatCanvas(statctx)
        setMainCanvas(ctx);
    },[]);
    
    useEffect(()=>{        
        let background=new Image();

        background.onload=()=>{
            setIcon(svgs.bird);
            setBackground(background)
        } 
        background.src= svgs.bg;
    },[])

    useEffect(()=>{
        if(activePage!=='landing') resetSimulation();     
        if(activePage==='playMode') playSetupAnimation();   
    },[activePage])

    useEffect(()=>{
        if(state!=='Offline'&&state!=='Paused') simulation(speed,false)
    },[visual])

    useEffect(() => {
        if(icon!==null&&background!==null) setupAnimation(); 
    }, [options.gapWidth,options.population,icon,background])

    useEffect(() => {
        if(mainCanvas!==null&&background!==null) landingAnimation(); 
    }, [mainCanvas,background])

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
            totalRoundScore,
            background,
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
                createdBirds.push(new Bird(options.neuralNetwork,'',w))
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
                background.update();
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
                    if(pipes[0].x<-20) pipes.shift();
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
                    deadBirds.sort((a,b)=>a.id-b.id);
                    let data=nextGeneration(deadBirds,options,generationalData,currentRound,generation)
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
                    background.pos=-80;
                    // if(data.alfa!==null) saveDataToServer(data.alfa)
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
                    totalRoundScore,
                    background,
                }
            }
            mainAnimation(birds,pipes,gapWidth,inputData,background)
            displayRoundStats(savedData,population);    
            if(speed>0){
                currentAnimation.current=requestAnimationFrame(simulationLoop)
            }
        }
        simulationLoop();
    }
    
    function mainAnimation(birds,pipes,gapWidth,inputData,bg){
        resetCanvas(mainCanvas)
        mainCanvas.strokeStyle = "#000000";
        bg.draw(mainCanvas,background)
        for(var b=0;b<birds.length;b++){
            birds[b].draw(mainCanvas,icon)
        }
        for(var i=0;i<pipes.length;i++){
            pipes[i].draw(mainCanvas,gapWidth)
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

    const displayManualStats=(currentRound,round,hScore)=>{

        resetCanvas(statCanvas);
        statCanvas.font = "20px Arial ";
        statCanvas.fontColor = "20px Arial";
        statCanvas.fillStyle = 'rgb(114, 114, 114)';
        statCanvas.fillText('Round:', 10, 50);  
        statCanvas.fillText('Score:', 10, 80); 
        statCanvas.fillText('High Score:', 10, 110); 

        statCanvas.font = "700 26px Arial";
        statCanvas.fillStyle = 'rgb(55, 61, 80)';
        statCanvas.fillText(round, 130, 50);
        statCanvas.fillText(currentRound, 130, 80);
        statCanvas.fillText(hScore, 130, 110);
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
        mainCanvas.rect(20-15,inputData[0]*600-15,30,30)
        mainCanvas.rect(20+30,inputData[0]*600+5,0,-20+inputData[4]*120)
        mainCanvas.stroke();
    }

    const landingAnimation=async()=>{

        let { background }=savedData.current
        let birds=[],pipes=[],currentRound=0
        let { pipeRate,choiceRate,gapWidth }=options
        let inputData=null;

        birds.push(new Bird(options.neuralNetwork,''))
        await birds[0].brain.createAlpha(alpha.alfa.weights)
        async function simulationLoop(){
            background.update();
            birds[0].update();
            if(currentRound%pipeRate===0){
                pipes.push(new Pipe(Math.floor(Math.random()*400+(300-400/2))))
            }
            for(var i=0;i<pipes.length;i++){
                pipes[i].update();
                if(pipes[0].x<-20) pipes.shift();
            }
            let currentPipe=pipes[0].x>10?pipes[0]:pipes[1];
            let nndata=await birds[0].think(currentPipe,gapWidth);inputData=nndata.inputData;
            let choice=nndata.outputData
            if(choice[0]<choiceRate/100) birds[0].up();
            
            if(birds[0].x>pipes[0].x){
                if(birds[0].y<pipes[0].gap-gapWidth||birds[0].y>pipes[0].gap+gapWidth){
                    birds[0].alive=false;
                }
            }

            if(birds[0].alive===false){
                birds=[];
                birds.push(new Bird(options.neuralNetwork,''))
                await birds[0].brain.createAlpha(alpha.alfa.weights)
                pipes=[];
                pipes.push(new Pipe(300))
                currentRound=0;
                background.pos=-80;
            }

            currentRound++;
            mainAnimation(birds,pipes,gapWidth,inputData,background)
            displayBirdView(inputData);
            currentAnimation.current=requestAnimationFrame(simulationLoop)
        }
        simulationLoop();
    }

    const playSimulation=()=>{
        setState('Online')
        cancelAnimationFrame(currentAnimation.current);
        let { birds,background }=savedData.current
        let pipes=[],currentRound=0
        let inputData=null;
        let {
            pipeRate,
            gapWidth
        }=options

        birds.push(new Bird(options.neuralNetwork,''))
        let round=0;
        let hScore=0;
        function simulationLoop(){
            background.update();
            birds[0].update();
            if(currentRound%pipeRate===0){
                pipes.push(new Pipe(Math.floor(Math.random()*400+(300-400/2))))
            }
            for(var i=0;i<pipes.length;i++){
                pipes[i].update();
                if(pipes[0].x<-10) pipes.shift();
            }

            if(birds[0].x>pipes[0].x){
                if(birds[0].y<pipes[0].gap-gapWidth||birds[0].y>pipes[0].gap+gapWidth){
                    birds[0].alive=false;
                }
            }

            if(birds[0].alive===false){
                birds=[]; 
                pipes=[];
                birds.push(new Bird(options.neuralNetwork,''))
                pipes.push(new Pipe(300))
                currentRound=0;
                background.pos=-80;
                round++;
            }

            currentRound++;
            if(hScore<=currentRound) hScore=currentRound
            mainAnimation(birds,pipes,gapWidth,inputData,background);
            displayManualStats(currentRound,round,hScore);
            currentAnimation.current=requestAnimationFrame(simulationLoop)
            savedData.current={birds}
        }
        simulationLoop();
    }

    const playSetupAnimation=()=>{
        resetCanvas(mainCanvas)
        mainCanvas.strokeStyle = "#000000";
        savedData.current.background.draw(mainCanvas,background)
        let bird=new Bird(options.neuralNetwork,'')
        bird.draw(mainCanvas,icon)
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
        savedData.current.background.draw(ctx,background)
        for(var b=0;b<birds.length;b++){
            birds[b].draw(ctx,icon)
        }
        for(var i=0;i<pipes.length;i++){
            pipes[i].draw(mainCanvas,options.gapWidth)
        }        
        ctx.stroke();  
    }

    function changeSpeed(e){
        setSpeed(e.target.value)
        modifyOptions(e.target.value,'speed')
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
            background:new BackGround(-80),
        };
        resetGenerationalData();
        setPause(false);
        setState('Offline')
        setGlobalSimulationState('Offline')
        simulation(0,true);
        resetCanvas(statCanvas);
    }
    const jump=()=>{
        if(activePage==='playMode'&&state==='Online'){
            savedData.current.birds[0].up()
        }

    }

    const stopPlaySimulation=()=>{
        cancelAnimationFrame(currentAnimation.current);
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
            background:new BackGround(-80),
        };
        setState('Offline')
        playSetupAnimation();
    }

    const startPlaySimulation=()=>{
        if(state==='Offline'){
            playSimulation();
        }
    }

    return (
        <div className='neuralNetwork'
            style={{ 
                visibility:activePage==='simulation'?'visible':'hidden',
                // opacity=activePage==='simulation'?1:2
            }}>
            <Options
                speed={speed}
                startSimulation={startSimulation}
                pauseSimulation={pauseSimulation}
                resetSimulation={resetSimulation}
                startPlaySimulation={startPlaySimulation}
                stopPlaySimulation={stopPlaySimulation}
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
                onClick={(e)=>jump()}
                ref={canvasRef}
                className='canvas'
                width={600}
                height={600}
            >
            </canvas>
            <canvas
                style={{visibility:activePage==='landing'?'hidden':'visible'}}
                ref={statCanvasRef}
                className='statCanvas'
                width={200}
            >
            </canvas>
        </div>
    )
}

