import React from 'react'
import Simulation from './Simulation/Simulation'
import Charts from './Simulation/charts/Charts'
import Visuals from './Simulation/visuals/Visuals'

export default function Main() {
    return (
        <div className='mainSection'>
            <Visuals/>
            <Simulation/>
            <Charts/>
        </div>
    )
}
