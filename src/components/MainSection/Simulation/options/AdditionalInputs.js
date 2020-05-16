import React,{useContext} from 'react'
import {GlobalOptions} from '../../../../context/GlobalOptions'

export default function AdditionalInputs(props) {
    const {options,modifyOptions}=useContext(GlobalOptions);
    return (
        <div className='inputContainer'>
            <div className='optionHeader'>                
                <h2>Additional Settings</h2> 
            </div>  
            <div className='input'>
                    <div>
                    <p>Closing Rate</p>
                    <input type='range' defaultValue={5000} step={10} min={100} max={9999} onChange={(e)=>modifyOptions(Number(e.target.value),'closingRate')} />                           
                </div>
                <h3 className='inputValue'>{options.closingRate}</h3> 
            </div>  
            <div className='input'>
                    <div>
                    <p>Mutate rate</p>
                    <input type='range'min={0} max={50} defaultValue={10} onChange={(e)=>modifyOptions(Number( e.target.value/100),'mutateRate')} />
                </div>
                <h3 className='inputValue'>{(options.mutateRate*100).toFixed(0)+'%'}</h3> 
            </div>    
      </div>
    )
}
