import React from 'react'

export default function SimulationStats(props) {
    const {generation,count,scoreCount,initialPopulation}=props;
    return (
        <div className='simulationStats'>
            <div className='simulationStat'>
                <p>Generation: <span className='simulationNumber'>{generation}</span></p>
            </div>
            <div className='simulationStat'>
                <p>Bird Count: <span className='simulationNumber'>{`${count}/${initialPopulation}`}</span></p>
            </div>
            <div className='simulationStat'>
                <p>Score: <span className='simulationNumber'>{`${scoreCount}`}</span></p>
            </div>
        </div>
    )
}
