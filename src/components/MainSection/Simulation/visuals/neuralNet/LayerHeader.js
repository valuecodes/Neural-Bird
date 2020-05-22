import React from 'react'
import AddNeular from './AddNeular'

export default function LayerHeader(props) {
    const {neuralNet,optionsOpen}=props

    let sum = neuralNet.reduce((accumulator, neural)=> 
        accumulator + neural.neurals.length
      , 0)

    return (
        <div 
            className='layerOptions' 
            style={{height:optionsOpen?35:0}}
            >
            <div className='lOptions' style={{
                opacity:optionsOpen?1:0,
            }}>
                <h3>Type: <span className='oValue'>Dense</span> </h3>
                <h3>Layers: <span className='oValue'>{neuralNet.length}</span> </h3>
                <h3>Neurals: <span className='oValue'>{sum}</span></h3>
            </div>
            <div
            className='neuralOptions'
            style={{display:optionsOpen?'':'none'}}
            >
                {neuralNet.map((layer,index)=>
                        <AddNeular
                        key={index}
                        layer={layer.id}
                        addNeular={props.addNeular}
                        deleteNeular={props.deleteNeular}
                    />
                )}
            </div>
        </div>
    )
}
