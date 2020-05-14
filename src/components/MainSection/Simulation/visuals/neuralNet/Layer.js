import React,{useRef,useEffect,useState} from 'react'
import ReactDOM from 'react-dom';
import Neuron from './Neuron'
// import AddNeular from './AddNeular'
import NeuralSvg from './NeuralSvg'

export default function Layer( props) {
    const inputRef = useRef()
    const {layer}=props
    const [currentLayer,setCurrentLayer]=useState({
        type:'',
        neuralsCount:0,
        id:0,
        neurals:[]
    });    
    
    const [coordinates,setCordinates]=useState([]);

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
            {/* <NeuralSvg /> */}
            
            {currentLayer.neurals.map(neuron=>
                <div className='neuron' ref={el => {
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
