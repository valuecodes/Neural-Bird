import React,{useEffect,useState} from 'react'

export const SimulationButtons=(props)=> {
    const {state}=props
    return (
        <div className='simulationButtons'>
            <button 
                style={{
                    display:state!=='Offline'?'none':''
                }} 
                onClick={()=>props.startSimulation()}
                >Start Simulation</button>
            
            <button 
                style={{
                    display:state==='Offline'?'none':''
                }} 
                onClick={()=>props.pauseSimulation()}
                >{state==='Paused'?'Continue':'Pause'}</button> 
            <button 
                style={{
                    display:state==='Offline'?'none':''
            }} onClick={()=>props.resetSimulation()}>Reset</button>
        </div>
    )
}
