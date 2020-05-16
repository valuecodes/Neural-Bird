import React,{useState} from 'react'
import SimulationControl from './SimulationControl'
import AdditionalInputs from './AdditionalInputs'
import SetupInput from './SetupInput'
import SimulationButtons from './SimulationButtons'
import SimulationStats from './SimulationStats'
import svgs from '../../../../utils/Utils'

export default function Options(props) {


    const {speed,population,count,generation,scoreCount,state,currentGapWidth}=props

    const [optionsOpen,setOptions]=useState(false)

    const openOptions=()=>{
        setOptions(!optionsOpen)
    }

    return (
        <div className='options'>
            <div className='simulationControl' >
                <SimulationButtons
                    state={state}
                    startSimulation={props.startSimulation}
                    pauseSimulation={props.pauseSimulation}
                    resetSimulation={props.resetSimulation}
                />
                <SimulationControl
                    generation={generation}
                    count={count}
                    scoreCount={scoreCount}
                    state={state}
                />
            </div>
            <SimulationStats
                generation={generation}
                count={count}
                scoreCount={scoreCount}
                population={population} 
                state={state} 
                currentGapWidth={currentGapWidth}
            />
            <SetupInput
                openOptions={openOptions}
                state={state}
            />
            <div className='additionalnputs' style={{
                width:optionsOpen?500:0,
                marginLeft:optionsOpen?1:0,
                display:state==='Offline'?'':'none'
                }}>
                <AdditionalInputs
                    state={state}
                />  
            </div>
        </div>
    )
}
