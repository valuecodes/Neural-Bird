import React from 'react'

export default function Generation(props) {

    return (
        <div className='generation'>
            {props.oldGen.map((gen,index)=>
                <div
                    key={index}
                    className='oldgen'
                    style={{
                        // backgroundColor:
                    }}>
                    <p>{(gen[3]*100).toFixed(2)}%</p>
                </div>
            )}
        </div>
    )
}
