import React from 'react'

export default function VisualInfo({text,message}) {
    return (
        <div className='visualInfo'>
            <p>{text}</p>
            <p className='visualMessage'>{message}</p>
        </div>
    )
}
