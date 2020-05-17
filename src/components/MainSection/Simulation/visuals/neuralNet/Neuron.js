import React from 'react'

export default function Neuron({neuron,type}) {
    return (
        <>
            <div className='neuronInfo'>
                {type} {neuron.name}
            </div>
        </>
    )
}
