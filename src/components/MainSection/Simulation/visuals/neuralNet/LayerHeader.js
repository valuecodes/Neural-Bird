import React,{useState} from 'react'
import svgs from '../../../../../utils/Utils'
import AddNeular from './AddNeular'

export default function LayerHeader(props) {
    const {neuralNet}=props
    const [optionOpen,setOptionOpen]=useState(false);

    const openOptions=()=>{
        setOptionOpen(!optionOpen)
    }
    let sum = neuralNet.reduce((accumulator, neural)=> 
        accumulator + neural.neurals.length
      , 0)
    return (
        <div className='layerOptions' style={{
            marginTop:optionOpen?-0:-60
        }}>
            <div className='lOptions' style={{
                opacity:optionOpen?1:0,
            }}>
                <h3>Type: <span className='oValue'>Dense</span> </h3>
                <h3>Layers: <span className='oValue'>{neuralNet.length}</span> </h3>
                <h3>Neurals: <span className='oValue'>{sum}</span></h3>
            </div>
                <img
                    alt='optionImage'
                    style={{marginTop:optionOpen?-40:+20}}
                    onClick={()=>openOptions()} 
                    className='optionImage layerOpen' 
                    src={svgs.options}
                /> 
            <div
            style={{
                marginTop:optionOpen?10:-120
            }}
            className='neuralOptions'>
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
