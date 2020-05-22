import React from 'react'

export default function AddNeular(props) {
    return (
        <div 
            className='addLayer' 
            style={{visibility:props.layer===0?'hidden':''
        }}>
            <button className='minus' onClick={()=>props.deleteNeular(props.layer)}>-</button>    
            <span></span>
            <button className='plus' onClick={(e)=>props.addNeular(props.layer)}>+</button>
        </div>
    )
}
