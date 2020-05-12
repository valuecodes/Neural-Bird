import React from 'react'
import svgs from '../../../../utils/Utils'

export default function Input(props) {
    const {gapWidth,initialPopulation,closingRate,mutateRate}=props

    return (
        <>
            <div className='optionHeader'>
                <h2>Setup</h2> 
                <img onClick={()=>props.openOptions()} className='optionImage' src={svgs.options}/>      
            </div>
            <div className='input'>
                <div>
                    <p>Gap Width</p>
                    <input type='range' defaultValue={50} onChange={(e)=>props.changeGapWidth(e)} />                         
                </div>
                <h3 className='inputValue'>{gapWidth/2}</h3>
            </div>
                <div className='input'>
                    <div>
                    <p>Initial population</p>
                    <input type='range' defaultValue={10} onChange={(e)=>props.changePopulationSize(e)} />                           
                </div>
                <h3 className='inputValue'>{initialPopulation}</h3> 
            </div>    
            <div className='input'>
                    <div>
                    <p>Closing Rate</p>
                    <input type='range' defaultValue={500} step={10} min={10} max={1000}onChange={(e)=>props.changeClosingRate(e)} />                           
                </div>
                <h3 className='inputValue'>{closingRate}</h3> 
            </div>  
            <div className='input'>
                    <div>
                    <p>Mutate rate</p>
                    <input type='range'min={0} max={50} defaultValue={10} onChange={(e)=>props.changeMutateRate(e)} />
                </div>
                <h3 className='inputValue'>{mutateRate*100+'%'}</h3> 
            </div>    
      </>
    )
}
