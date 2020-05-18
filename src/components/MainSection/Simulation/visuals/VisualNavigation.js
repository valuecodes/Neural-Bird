import React,{useEffect} from 'react'

export default function VisualNavigation(props) {
    useEffect(()=>{
        console.log(window.innerHeight)
    },[window])
    return (
        <div className='visualNavigation'>            
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
