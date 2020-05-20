import React,{useState,useContext,useEffect} from 'react'
import {GlobalContext} from '../../../../../context/GlobalState'
export default function NeuralSvg(props) {

    const [coordinates,setCoordinates]=useState([]);
    const { nnCoordinates,activePage} =useContext(GlobalContext);

    useEffect(()=>{
        var offsets = document.getElementById('layers').getBoundingClientRect();
        let newCoordinates=calculateConnections(nnCoordinates,props.neuralNet,offsets);
        setCoordinates(newCoordinates);
    },[nnCoordinates]);
    
    const calculateConnections=(nnc,nn,offSet)=>{
        let layers=nn.map(layer=>layer.neurals)
        let coordinates=[]
        let sCount=0;
        let eCount=0;
        let totalCount=0;
        for(var i=0;i<layers.length-1;i++){
            let thisLayer=i;
            let nextLayer=i+1
            eCount=layers[thisLayer].length+totalCount;
            for(var a=0;a<layers[thisLayer].length;a++){
                for(var c=0;c<layers[nextLayer].length;c++){
                    coordinates.push({
                        x1:nnc[sCount].x+nnc[sCount].width/2-offSet.x,
                        y1:nnc[sCount].y+nnc[sCount].height/2-offSet.y,
                        x2:nnc[eCount].x+nnc[sCount].width/2-offSet.x,
                        y2:nnc[eCount].y+nnc[sCount].height/2-offSet.y,
                    })
                    eCount++;
                }     
                eCount=layers[thisLayer].length+totalCount;
                sCount++;
            }
            totalCount=+layers[thisLayer].length;
        }
        return coordinates
    }

    return (
        <svg className='neuralSvg'
        style={{
            visibility:activePage==='landing'||activePage==='simulation'?'visible':'hidden'
        }}
        >
            {coordinates.map((elem,index)=>
                <line key={index} className='neuralLine' x1={elem.x1} y1={elem.y1} x2={elem.x2} y2={elem.y2} strokeWidth="1" 
                style={{
                    stroke:'black',
                    strokeWidth:0.5,
                }}  /> 
            )}
        </svg>
    )
}
