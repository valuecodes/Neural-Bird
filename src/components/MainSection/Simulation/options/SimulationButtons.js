import React from 'react'

export default function SimulationButtons(props) {
    const {speed,gapWidth,state}=props
    return (
        <div className='simulationButtons'>
            <button 
                style={{
                    display:state!=='Offline'?'none':''
                }} 
                onClick={()=>props.startSimulation(speed,gapWidth)}
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
