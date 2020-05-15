import React,{useEffect,useState} from 'react'
import Neuron from './Neuron'

export default function Layer( props) {
    const {layer}=props
    const [currentLayer,setCurrentLayer]=useState({
        type:'',
        neuralsCount:0,
        id:0,
        neurals:[]
    });    
    
    const [coordinates]=useState([]);

    useEffect(()=>{
        if(coordinates.length===currentLayer.neurals.length){
            setCurrentLayer(layer)
        }
    },[layer])


    return (
        <div className='layer'>
        
            <div className='layerHeader'>            
                <h3>{currentLayer.type}</h3>
            </div>
            {currentLayer.neurals.map((neuron,index)=>
                <div key={index} className='neuron' ref={el => {
                        if (!el) return;
                        if(layer.neurals.length===currentLayer.neurals.length){
                            props.updateCoordinates(el.getBoundingClientRect(),layer.id,neuron.id)
                        }
                        
                    }}>
                <Neuron neuron={neuron}/>
                </div>
            )}
            
        </div>
    )
}
