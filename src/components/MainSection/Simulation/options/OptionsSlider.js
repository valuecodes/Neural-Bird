import React,{useContext} from 'react'
import {GlobalOptions} from '../../../../context/GlobalOptions'
export default function OptionSlider({id,name,min,max,def,type}) {
    
    const {options,modifyOptions}=useContext(GlobalOptions);

    return (
        <div className='input'>
            <div>
            <p>{name}</p>
            <input type='range' defaultValue={def} min={min} max={max} onChange={(e)=>
                modifyOptions(e.target.value,id)} /> 
            </div>
        <h3 className='inputValue'>{options[id]}{type}</h3> 
    </div> 
    )
}
