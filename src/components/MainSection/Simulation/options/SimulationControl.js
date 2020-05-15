import React from 'react'

export default function SimulationControl(props) {

    const {generation,count,scoreCount,state}=props
    let color;
    switch(state){
        case 'Offline':
            color='rgba(156, 68, 99,1)'
            break;
        case 'Online':
            color='rgba(100, 196, 126)'
            break;
        case 'Paused':
            color='rgba(182, 189, 94,1)'
            break;
        default:
            color='black'
    }

    return (
        <div className='simulationState'>
            <h3 className='statHeader'>Simulation</h3>
            <h1  style={{color:color}}>{state}</h1>
        </div>
    )
}
