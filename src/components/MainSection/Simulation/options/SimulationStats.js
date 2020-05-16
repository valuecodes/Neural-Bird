import React from 'react'

export default function SimulationStats(props) {
    const {generation,count,scoreCount,state,population,currentGapWidth}=props;
    return (
        <div className='simulationStats' style={{
            display:state==='Offline'?'none':''
        }}>
            <div className='simulationStat'>
                <p>Generation: <span className='simulationNumber'>{generation}</span></p>
            </div>
            <div className='simulationStat'>
                <p>Bird Count: <span className='simulationNumber'>{`${count}/${population}`}</span></p>
            </div>
            <div className='simulationStat'>
                <p>Score: <span className='simulationNumber'>{`${scoreCount}`}</span></p>
            </div>
            <div className='simulationStat'>
                <p>Gap Width: <span className='simulationNumber'>{`${currentGapWidth}`}</span></p>
            </div>
        </div>
    )
}
