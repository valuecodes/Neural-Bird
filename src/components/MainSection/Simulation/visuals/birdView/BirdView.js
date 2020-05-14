import React,{useContext} from 'react'
import {GlobalContext} from '../../../../../context/GlobalState'
import VisualHeader from '../VisualHeader'

export default function BirdView() {

    const { globalInputData} = useContext(GlobalContext)
    return (
        <div className='birdView'>
            <VisualHeader header={'Bird View'}/>
            {globalInputData.map((input,index)=>
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
