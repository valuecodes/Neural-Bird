import React from 'react'
import svgs from '../../../../utils/Utils'

export default function AdditionalInputs(props) {
    const {gapWidth,initialPopulation,closingRate,mutateRate,state}=props

    return (
        <div className='inputContainer'>
            <div className='optionHeader'>                
                <h2>Additional Settings</h2> 
            </div>  
            <div className='input'>
                    <div>
                    <p>Closing Rate</p>
                    <input type='range' defaultValue={5000} step={10} min={100} max={9999}onChange={(e)=>props.changeClosingRate(e)} />                           
                </div>
                <h3 className='inputValue'>{closingRate}</h3> 
            </div>  
            <div className='input'>
                    <div>
                    <p>Mutate rate</p>
                    <input type='range'min={0} max={50} defaultValue={10} onChange={(e)=>props.changeMutateRate(e)} />
                </div>
                <h3 className='inputValue'>{(mutateRate*100).toFixed(0)+'%'}</h3> 
            </div>    
      </div>
    )
}
