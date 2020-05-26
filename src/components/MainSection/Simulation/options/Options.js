import React,{useEffect,useState,useContext} from 'react'
import SimulationControl from './SimulationControl'
import AdditionalOptions from './AdditionalOptions'
import SetupOptions from './SetupOptions'
import ManualPlay from './ManualPlay'
import {SimulationButtons} from './SimulationButtons'
import {GlobalContext} from '../../../../context/GlobalState'

export default function Options(props) {
    const { 
        activePage 
    }=useContext(GlobalContext);
    const {state}=props
    const [optionsOpen,setOptions]=useState(false)

    useEffect(() =>{
        setOptions(false)
    }, [state])

    const openOptions=()=>{
        setOptions(!optionsOpen)
    }

    return (
        <div className='options'
            style={{
                marginTop:activePage==='simulation'?0:200
            }}
        >
            <div className='simulationControl' >
                <SimulationButtons
                    state={state}
                    startSimulation={props.startSimulation}
                    pauseSimulation={props.pauseSimulation}
                    resetSimulation={props.resetSimulation}
                />
                <SimulationControl
                    state={state}
                />
            </div>
            <SetupOptions
                openOptions={openOptions}
                state={state}
            />
            <AdditionalOptions 
                optionsOpen={optionsOpen} 
                state={state}
            /> 
            <ManualPlay
                startPlaySimulation={props.startPlaySimulation}
                stopPlaySimulation={props.stopPlaySimulation}
                state={state}
            />
        </div>
    )
}
