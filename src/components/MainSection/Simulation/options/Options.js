import React,{useState} from 'react'
import Statistics from './Statistics'
import Inputs from './Inputs'

export default function Options(props) {

    // console.log(props);
    const {speed,gapWidth,initialPopulation,population,count,generation,scoreCount,state,closingRate,mutateRate}=props

    const [optionsOpen,setOptions]=useState(false)

    const openOptions=()=>{
        setOptions(!optionsOpen)
    }

    return (
        <div className='options'>
            <div className='buttons'>
                <button onClick={()=>props.startSimulation(speed,gapWidth)}>Start Simulation</button>
                <button style={{
                    visibility:state==='Offline'?'hidden':'visible'
                }} onClick={()=>props.pauseSimulation()}>{state==='Paused'?'Continue':'Pause'}</button> 
                <button style={{
                    visibility:state==='Offline'?'hidden':'visible'
                }} onClick={()=>props.resetSimulation()}>Reset</button>             }
            </div>
            <div className='statistics' >
                <Statistics
                    generation={generation}
                    count={count}
                    scoreCount={scoreCount}
                    state={state}
                />
            </div>

            <div className='inputs' style={{
                height:optionsOpen?600:140
                }}>
                <Inputs
                    openOptions={openOptions}
                    changeGapWidth={props.changeGapWidth}
                    gapWidth={props.gapWidth}
                    changePopulationSize={props.changePopulationSize}
                    initialPopulation={props.initialPopulation}
                    changeClosingRate={props.changeClosingRate}
                    closingRate={closingRate}
                    mutateRate={mutateRate}
                    changeMutateRate={props.changeMutateRate}
                />  
            </div>
        </div>
    )
}
