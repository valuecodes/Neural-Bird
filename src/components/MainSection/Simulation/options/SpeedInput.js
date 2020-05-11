import React from 'react'

export default function SpeedInput(props) {
    const {speed}=props;
    return (
        <div className='input speedInput'>
            <div>
                <p className='speedTag'>Speed <span className='speedHeader'>{speed+`x`}</span></p>                   
                <input className='speed' type='range' step={1} defaultValue={1} onChange={(e)=>props.changeSpeed(e)} />  
            </div>           
    </div>
    )
}
