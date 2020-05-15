import React,{useState} from 'react'
import SimulationControl from './SimulationControl'
import AdditionalInputs from './AdditionalInputs'
import SetupInput from './SetupInput'
import SimulationButtons from './SimulationButtons'
import SimulationStats from './SimulationStats'
import svgs from '../../../../utils/Utils'

export default function Options(props) {

    // console.log(props);
    const {speed,gapWidth,initialPopulation,population,count,generation,scoreCount,state,closingRate,mutateRate}=props

    const [optionsOpen,setOptions]=useState(false)

    const openOptions=()=>{
        setOptions(!optionsOpen)
    }

    return (
        <div className='options'>
            <div className='simulationControl' >
                <SimulationButtons
                    speed={props.speed}
                    gapWidth={props.gapWidth}
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
                initialPopulation={initialPopulation} 
                state={state} 
            />
            <SetupInput
                openOptions={openOptions}
                changeGapWidth={props.changeGapWidth}
                gapWidth={props.gapWidth}
                changePopulationSize={props.changePopulationSize}
                initialPopulation={props.initialPopulation}
                state={state}
            />
            <div className='additionalnputs' style={{
                width:optionsOpen?500:0,
                marginLeft:optionsOpen?1:0,
                display:state==='Offline'?'':'none'
                }}>
                <AdditionalInputs
                    changeClosingRate={props.changeClosingRate}
                    closingRate={closingRate}
                    mutateRate={mutateRate}
                    changeMutateRate={props.changeMutateRate}
                    state={state}
                />  
            </div>
        </div>
    )
}
