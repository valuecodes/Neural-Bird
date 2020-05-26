import React,{useContext} from 'react'
import {GlobalContext} from '../../../../context/GlobalState'

export default function ManualPlay(props) {
    const {state} = props
    const {activePage} = useContext(GlobalContext)
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
        <div className='manualPlay'
            style={{visibility:activePage==='playMode'?'visible':'hidden'}}
        >
        <div className='manualInfo'>            
            <div className='simulationButtons'>
                <button onClick={()=>props.startPlaySimulation()}>
                    Start
                </button>
                <button onClick={()=>props.stopPlaySimulation()}>
                    Reset
                </button>
            </div>
            <div className='simulationState manualState'>
                <h3 className='statHeader'>Click on the screen to jump</h3>
                <h1 style={{color:color}}>{state}</h1>
            </div>
        </div>
        </div>
    )
}
