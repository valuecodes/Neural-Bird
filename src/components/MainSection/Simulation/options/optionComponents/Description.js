import React from 'react'
import svgs from './../../../../../utils/Utils'

export default function Description({desc}) {
    return (
        <div className='description'>
            <img alt='description' className='infosvg' src={svgs.info}/>
            <p className='descriptionText'>{desc}</p>
        </div>
    )
}
