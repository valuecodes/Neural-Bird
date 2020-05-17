import React,{useContext} from 'react'
import {GlobalOptions} from '../../../../context/GlobalOptions'

export default function OptionSlider({id,name,min,max,def,type,add}) {
    const {options,modifyOptions}=useContext(GlobalOptions);

    let value=0;
    // let valueMax=0;

    switch(add[1]) {
        case '/':
            value=options[id]/add[2] 
            if(add[3]==='reverse') value=(max/add[2]+1)-value
            break;
        case '*':
            value=options[id]*add[2] 
            if(add[3]==='reverse') value=(max*add[2])-value
            break;
        default:
          value=options[id];
      }

      

    return (
        <div className='input'
            
        >
            <div>
            <p>{name}</p>
            <input style={{
                direction:add[0]
            }} type='range' defaultValue={def} min={min} max={max} onChange={(e)=>
                modifyOptions(e.target.value,id)} /> 
            </div>
        <h3 className='inputValue'>{value.toFixed(0)}{type}</h3> 
    </div> 
    )
}
