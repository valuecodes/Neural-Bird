import React,{useContext} from 'react'
import {GlobalContext} from '../../../../context/GlobalState'
export default function VisualNavigation(props) {

    const { activePage }=useContext(GlobalContext);
    
    return (
        <div className='visualNavigation'
            style={{
                marginTop:activePage==='simulation'?50:0,
                visibility:activePage==='landing'?'hidden':'visible'
            }}
        >            
            <button onClick={()=>props.changePage('')}
                style={{display:window.innerWidth<1100?'':'none'}}
            >Simulation</button>
            <button onClick={()=>props.changePage('nn')}>Neural Network</button>
            <button onClick={()=>props.changePage('bird')}>Bird View</button>
            <button onClick={()=>props.changePage('family')}
            style={{display:window.innerWidth<1100?'none':''}}
            >Family tree</button>
            <button onClick={()=>props.changePage('dna')}>DNA</button>            
            <button onClick={()=>props.changePage('charts')}
                style={{display:window.innerWidth<1100&&props.state!=='Offline'?'':'none'}}
            >Charts</button>
        </div>
    )
}
