import React,{useState,useEffect,useContext} from 'react'
import Layer from './Layer'
import VisualHeader from '../VisualHeader'
import LayerHeader from './LayerHeader'
import NeuralSvg from './NeuralSvg'
import {GlobalContext} from '../../../../../context/GlobalState'
import {GlobalOptions} from '../../../../../context/GlobalOptions'
import VisualInfo from './../VisualInfo'

export default function NeuralNet() {

    const { updateNNCoordinates,activePage }=useContext(GlobalContext);
    const {options,modifyOptions}=useContext(GlobalOptions);
    const [neuralNet,setNeuralNet]=useState([])
    let [coordinates,setCoordinates]=useState([]);
    const [optionsOpen,setOptionsOpen]=useState(false)

    useEffect(()=>{
        setNeuralNet(options.neuralNetwork)
    },[options.neuralNetwork])
    
    const addNeular=(id)=>{
        const nn=[...neuralNet];
        const layer= nn.filter(nn=>nn.id===id)
        layer[0].neurals.push({id:layer[0].neurals.length,name:layer[0].neurals.length});
        nn[id]=layer[0];
        layer[0].neuralsCount++;
        modifyOptions(nn,'neuralNetwork')
        setCoordinates([]);
    }
    const deleteNeular=(id)=>{
        const nn=[...neuralNet];
        const layer= nn.filter(nn=>nn.id===id)
        if(layer[0].neuralsCount>1){
            layer[0].neurals.pop();
            nn[id]=layer[0];
            layer[0].neuralsCount--;
            modifyOptions(nn,'neuralNetwork')           
        }
        setCoordinates([]);
    }

    const updateCoordinates=(cor,lID,NID)=>{
        if(lID===0&&NID===1) coordinates=[]

        let sum = neuralNet.reduce((accumulator, neural)=> 
        accumulator + neural.neurals.length
      , 0)
        coordinates.push(cor);
        if(coordinates.length===sum) updateNNCoordinates(coordinates)
    }

    const changeSettings=()=>{  
        setOptionsOpen(!optionsOpen)
    }
    
    return (
        <div className='neuralNet'
            style={{
                // visibility:activePage==='landing'||activePage==='simulation'?'visible':'hidden'
            }}
        >
            <VisualHeader header={'Neural Network'} changeSettings={changeSettings} option={'optionsOpen'}/>
            <LayerHeader 
                neuralNet={neuralNet}
                addNeular={addNeular} 
                deleteNeular={deleteNeular}
                optionsOpen={optionsOpen}
            />
            <VisualInfo text={'Current neural network layout'}/>
            <NeuralSvg neuralNet={neuralNet} />
            <div id='layers'
                        style={{
                            visibility:activePage==='landing'||activePage==='simulation'?'visible':'hidden'
                        }}
            >
                {neuralNet.map((layer,index)=>
                    <Layer key={index} updateCoordinates={updateCoordinates} layer={layer}/>
                )}                
            </div>
        </div>
    )
}
