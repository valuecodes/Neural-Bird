import React,{useContext} from 'react'
import {GlobalInOut} from '../../../../../context/GlobalInOut'
import {GlobalOptions} from './../../../../../context/GlobalOptions'
import VisualHeader from '../VisualHeader'
import VisualInfo from './../VisualInfo'

export default function BirdView() {
    const { inOutData} = useContext(GlobalInOut)
    const { options} = useContext(GlobalOptions)
    let message=options.speed>=5?'Speed must be below 5x':'';
    return (
        <div className='birdView'>
            <VisualHeader header={'Bird View'} option={null}/>
            <VisualInfo text={'Bird Input/Output data visualized'} message={message}/>
            {inOutData.map((input,index)=>
                <div key={index} className='birdInput'>
                    <p>{`Bird y:${input[0].toFixed(2)}`}</p>
                    <p>{`Pipe top:${input[1].toFixed(2)}`}</p>
                    <p>{`Pipe bot:${input[2].toFixed(2)}`}</p>
                    <p>{`Pipe x:${input[3].toFixed(2)}`}</p>
                    <p>{`Velocity:${input[4].toFixed(2)}`}</p>
                    <p>{`Jump:${input[5].toFixed(2)}`}</p>
                </div>
            )}
            <div className='fade'></div>
        </div>
    )
}
