import React from 'react'

export default function VisualNavigation(props) {
    return (
        <div className='visualNavigation'>            
            <button onClick={()=>props.changePage('nn')}>Neural Network</button>
            <button onClick={()=>props.changePage('bird')}>Bird View</button>
            <button onClick={()=>props.changePage('family')}>Family tree</button>
            <button onClick={()=>props.changePage('dna')}>DNA</button>
        </div>
    )
}
