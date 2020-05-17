import React from 'react'

export default function SimulationStats({state}) {
    return (
        <div className='simulationStats' style={{
            display:state==='Offline'?'none':''
        }}>
        </div>
    )
}
