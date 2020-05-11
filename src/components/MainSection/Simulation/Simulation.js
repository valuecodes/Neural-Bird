// import React,{useState,useEffect} from 'react'
// import Bird from './animation/bird'
// import Pipe from './animation/pipe'
// import NeuralNetwork from './NeuralNetwork'
// import Options from './options/Options'

// export default function Simulation() {

//     const canvasRef = React.useRef(null)

//     const isOn=true;

//     const [draw,setDraw]=useState([]);
//     const [speed,setSpeed]=useState(1);
//     const [gapWidth,setGapWidth]=useState(100);
//     const [position,setPosition]=useState(null);

//     useEffect(() => {
//         // start(speed,gapWidth);
//     }, [])


//     function start(speed,gapWidth){

//         cancelAnimationFrame(draw);

//         const canvas=canvasRef.current
//         const ctx=canvas.getContext('2d')
//         let pos=position===null?0:position;

//         // Create first Pipe
//         let pipes=[];
//         pipes.push(new Pipe(gapWidth))

//         // Create Birds
//         function createBirds(nn){
//             let createdBirds=[]
//             for(var w=0;w<200;w++){
//                 createdBirds.push(new Bird('',speed))
//                 createdBirds[w].y=300;
//             }      
//             return createdBirds  
//         }        
      
//         let birds=createBirds();

//         let count=0;
//         let copy=null;

//         let scoreCount=0;
//         let highCopy=null;
//         let currentRound=0;
//         let generation=1;

//         async function newDraw(){


//             for(var q=0;q<speed;q++){

//                 let difficulty=currentRound/20;
//                 let padding=0;
                
//                 if(difficulty>400){
//                     difficulty=400;
//                 }                

//                 // Pipes
//                 if(pipes[0].x<300&&pipes.length<2){
//                     pipes.push(new Pipe(Math.floor(Math.random() *difficulty+(200-difficulty/2))))
//                 }
//                 for(var i=0;i<pipes.length;i++){
//                     pipes[i].update();
//                 }
//                 // Remove pipe when it reaches off screen
//                 if(pipes[0].x<0) pipes.shift();

//                 for(var b=0;b<birds.length;b++){
//                     birds[b].update(speed);
//                     let choice=await birds[b].think(pipes[0],gapWidth);
//                     if(choice[0]<0.5){
//                         birds[b].up()
//                     }
//                     if(birds[b].x>pipes[0].x-10&&birds[b].x<pipes[0].x+10){
//                         if(birds[b].y<pipes[0].gap||birds[b].y>pipes[0].gap+gapWidth){
//                             birds[b].alive=false;
//                         }
//                     }
//                 }

//                 let newBirds=[...birds]
//                 newBirds= newBirds.filter(bird=>bird.alive===true);
//                 birds=newBirds;

//                 if(birds.length===1&&scoreCount>2000){
//                     copy=birds[0].brain.copy();
//                     speed=3;
//                     scoreCount=0;
//                 }

//                 if(birds.length<1){
//                     if(copy===null){
//                         birds=createBirds('')
//                     }else{
//                         birds=[new Bird(copy)]
//                     }
                    
//                     pipes=[];
//                     pipes.push(new Pipe(Math.floor(Math.random() *difficulty+(200-difficulty/2))))
//                     currentRound=0;
//                     count=0;
//                     scoreCount=0;
//                     generation++;
//                 }

//                 currentRound++;
//                 count++;
//                 scoreCount++;
//             }

//             ctx.beginPath(0,0);
//             ctx.clearRect(0, 0, 800, 800);

//             for(var b=0;b<birds.length;b++){
//                 ctx.rect(...birds[b].getPosition());
//             }

//             ctx.font = "30px Arial";
//             ctx.fillText(`Generation: ${generation}`,10,50);

//             for(var i=0;i<pipes.length;i++){
//                 ctx.rect(...pipes[i].getTopPipe());
//                 ctx.rect(...pipes[i].getBotPipe(gapWidth));
//             }
            
//             ctx.stroke();   

//             setDraw(requestAnimationFrame(newDraw))
//         }

//         newDraw();
//     }

//     function stop(){
//         cancelAnimationFrame(draw);
//         setPosition(draw.data)
//     }

//     function changeSpeed(e){
//         setSpeed(e.target.value/10)
//         start(e.target.value/10,gapWidth);
//     }

//     function click(e){
//         const canvas=canvasRef.current
//         const ctx=canvas.getContext('2d')
//         const rect = canvas.getBoundingClientRect()
//         console.log('clicked');
//     }

//     function changeGapWidth(e){
//         setGapWidth(e.target.value*5)
//         start(speed,e.target.value*5);
//     }

//     return (
//         <div className='neuralNetwork' onClick={(e)=>click(e)}>
//             <Options
//                 speed={speed}
//                 gapWidth={gapWidth}
//                 start={start}
//                 changeSpeed={changeSpeed}
//                 changeGapWidth={changeGapWidth}
//             />
//             <canvas
//                 ref={canvasRef}
//                 className='canvas'
//                 width={600}
//                 height={600}
//                 style={{
//                     fill:'black',
//                 }}
//             >

//             </canvas>
//             {/* <button onClick={()=>start(speed,gapWidth)}>start</button>
//             <button onClick={()=>stop()}>stop</button>
//             <input type='range' step={10} defaultValue={10} onChange={(e)=>changeSpeed(e)} />  
//             <input type='range' defaultValue={50} onChange={(e)=>changeGapWidth(e)} />  
//             <p>{speed}</p> */}
//         </div>
//     )
// }























import React,{useState,useEffect} from 'react'
import Bird from './animation/bird'
import Pipe from './animation/pipe'
import NeuralNetwork from './NeuralNetwork'
import Options from './options/Options'

export default function Simulation() {

    const canvasRef = React.useRef(null)

    const isOn=true;

    const [draw,setDraw]=useState([]);
    const [speed,setSpeed]=useState(1);
    const [initialPopulation,setInitialPopulation]=useState(100)
    // const [previousSpeed,setPreviousSpeed]=useState(0);
    const [pause,setPause]=useState(true);
    const [gapWidth,setGapWidth]=useState(150);
    const [savedPipes,setPipes]=useState([]);
    const [savedBirds,setBirds]=useState([]);
    const [savedCopy,setCopy]=useState(null)
    const [savedGeneration,setGeneration]=useState(1)
    const [savedCurrentRound,setCurrentRound]=useState(0)
    const [savedScoreCount,setScoreCount]=useState(0)
    // const 

    useEffect(() => {
        // startSimulation(speed,gapWidth,false);
    }, [])


    function startSimulation(speed,gapWidth,reset){

        console.log(initialPopulation)

        cancelAnimationFrame(draw);

        // Create first Pipe
        let pipes=savedPipes;
        if(pipes.length===0||reset){
            pipes=[];
            pipes.push(new Pipe(gapWidth))
        }
        
        let population=initialPopulation

        // Create Birds
        function createBirds(nn){
            let createdBirds=[]
            for(var w=0;w<population;w++){
                createdBirds.push(new Bird('',speed))
                createdBirds[w].y=300;
            }      
            return createdBirds  
        }        

        let birds=savedBirds;

        if(birds.length===0||reset){
            birds=[];
            birds=createBirds();
        }
      
        

        // let count=0;
        

        let scoreCount=reset?0:savedScoreCount;
        let currentRound=reset?0:savedCurrentRound;
        let generation=reset?0:savedGeneration;
        let copy=reset?null:savedCopy;
        console.log(copy,savedCopy);
        async function newDraw(){


            for(var q=0;q<speed;q++){

                let difficulty=currentRound/20;
                let padding=0;
                
                if(difficulty>400){
                    difficulty=400;
                }                

                // Pipes
                if(pipes[0].x<300&&pipes.length<2){
                    pipes.push(new Pipe(Math.floor(Math.random() *difficulty+(200-difficulty/2))))
                }
                for(var i=0;i<pipes.length;i++){
                    pipes[i].update();
                }
                // Remove pipe when it reaches off screen
                if(pipes[0].x<0) pipes.shift();

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
                    console.log(copy);
                    if(speed>20){
                        speed=3;
                    }
                    scoreCount=0;

                }

                if(birds.length<1){
                    if(copy===null){
                        birds=createBirds('')
                    }else{
                        birds=[new Bird(copy)]
                    }
                    
                    pipes=[];
                    pipes.push(new Pipe(Math.floor(Math.random() *difficulty+(200-difficulty/2))))
                    currentRound=0;
                    scoreCount=0;
                    generation++;
                }

                currentRound++;
                scoreCount++;
            }

            animation(birds,pipes,generation,currentRound,scoreCount,copy)

            setDraw(requestAnimationFrame(newDraw))
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

        ctx.font = "20px Arial";
        ctx.fillText(`Generation: ${generation}`,10,20);
        ctx.fillText(`Bird count: ${birds.length}`,170,20);
        ctx.fillText(`Current score: ${scoreCount}`,320,20);

        for(var i=0;i<pipes.length;i++){
            ctx.rect(...pipes[i].getTopPipe());
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

    function stop(){
        cancelAnimationFrame(draw);
    }

    function changeSpeed(e){
        setSpeed(e.target.value/10)
        if(!pause) startSimulation(e.target.value/10,gapWidth,false);
    }

    function click(e){
        const canvas=canvasRef.current
        const ctx=canvas.getContext('2d')
        const rect = canvas.getBoundingClientRect()
        console.log('clicked');
    }

    function changeGapWidth(e){
        let newSpeed=pause===true?0:speed;
        setGapWidth(e.target.value*5);
        startSimulation(newSpeed,e.target.value*5,false);
    }

    const pauseSimulation=()=>{
        let newSpeed=pause===false?0:speed;
        startSimulation(newSpeed,gapWidth,false);
        setPause(!pause)
    }

    const resetSimulation=()=>{
        setPause(false);
        setPipes([]);
        setBirds([]);
        setCopy(null);
        setGeneration(0);
        setCurrentRound(0);
        setScoreCount(0);
        startSimulation(3,100,true);
    }

    const changePopulationSize=(e)=>{
        let newSpeed=pause===false?0:speed;
        let population=e.target.value*2;
        setInitialPopulation(population)
        // startSimulation(newSpeed,gapWidth,population,false);
    }

    return (
        <div className='neuralNetwork' onClick={(e)=>click(e)}>
            <Options
                speed={speed}
                gapWidth={gapWidth}
                startSimulation={startSimulation}
                pauseSimulation={pauseSimulation}
                resetSimulation={resetSimulation}
                changeSpeed={changeSpeed}
                changeGapWidth={changeGapWidth}
                changePopulationSize={changePopulationSize}
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
            {/* <button onClick={()=>start(speed,gapWidth)}>start</button>
            <button onClick={()=>stop()}>stop</button>
            <input type='range' step={10} defaultValue={10} onChange={(e)=>changeSpeed(e)} />  
            <input type='range' defaultValue={50} onChange={(e)=>changeGapWidth(e)} />  
            <p>{speed}</p> */}
        </div>
    )
}

