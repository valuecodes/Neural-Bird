import React,{useContext} from 'react'
import {GlobalOptions} from '../../../../../context/GlobalOptions'
import Description from './Description'

export default function OptionSlider({id,name,min,max,def,type,add,desc}) {
    const {options,modifyOptions}=useContext(GlobalOptions);

    let value=0;

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
        <div className='input'>
            <p>{name}</p>
            <h3 className='inputValue'>{value.toFixed(0)}{type}</h3> 
            <Description desc={desc}/>            
            <input 
                className='inputSlider'
                style={{direction:add[0]}} 
                type='range' 
                defaultValue={def} 
                min={min} 
                max={max} 
                onChange={(e)=>modifyOptions(e.target.value,id)} 
            /> 
        </div> 
    )
}
