import React from 'react'
import Simulation from './Simulation/Simulation'
import Charts from './Simulation/charts/Charts'

export default function Main() {
    return (
        <div className='mainSection'>
            <Simulation/>
            <Charts/>
        </div>
    )
}
