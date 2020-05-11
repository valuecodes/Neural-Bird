import React from 'react'

export default function Options(props) {

    // console.log(props);
    const {speed,gapWidth}=props

    return (
        <div className='options'>
            <div className='buttons'>
                <button onClick={()=>props.startSimulation(speed,gapWidth)}>Start Simulation</button>
                <button onClick={()=>props.pauseSimulation()}>Pause</button>
                <button onClick={()=>props.resetSimulation()}>Reset</button>            
            </div>
            <div className='inputs'>
                <p>Speed</p>
                <input type='range' step={10} defaultValue={10} onChange={(e)=>props.changeSpeed(e)} />  
                <p>{speed}</p> 
                <p>Difficulty</p>
                <input type='range' defaultValue={50} onChange={(e)=>props.changeGapWidth(e)} /> 
                <p>Initial population</p>
                <input type='range' defaultValue={50} onChange={(e)=>props.changePopulationSize(e)} />  
                           

            </div>

        </div>
    )
}
