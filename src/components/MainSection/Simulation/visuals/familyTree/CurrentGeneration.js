import React from 'react'

export default function CurrentGeneration(props) {
    const {currentGeneration}=props
    return (
        <div className='currentGen'
            style={{
                visibility:currentGeneration.length===0?'hidden':'visible'
            }}>
            <h3 className='genHeader currentGenHeader'>Current Gen</h3>
            {currentGeneration.map((gen,index)=>
                <div key={index} onClick={()=>props.createFamilyTree(gen)}>
                    <p>{gen.birdID}</p>
                </div> 
            )}
        </div>
    )
}
