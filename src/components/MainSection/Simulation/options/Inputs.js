import React from 'react'
import svgs from '../../../../utils/Utils'

export default function Input(props) {
    const {gapWidth,initialPopulation}=props

    return (
        <>
            <div className='optionHeader'>
                <h2>Setup</h2> 
                <img onClick={()=>props.openOptions()} className='optionImage' src={svgs.options}/>      
            </div>
            <div className='input'>
                <div>
                    <p>Difficulty</p>
                    <input type='range' defaultValue={50} onChange={(e)=>props.changeGapWidth(e)} />                         
                </div>
                <h3 className='inputValue'>{100-gapWidth/2}%</h3>                 
            </div>
        
                <div className='input'>
                    <div>
                    <p>Initial population</p>
                    <input type='range' defaultValue={5} onChange={(e)=>props.changePopulationSize(e)} />                           
                </div>
                <h3 className='inputValue'>{initialPopulation}</h3> 
            </div>    
            <div className='input'>
                    <div>
                    <p>Initial population</p>
                    <input type='range' defaultValue={50} onChange={(e)=>props.changePopulationSize(e)} />                           
                </div>
                <h3 className='inputValue'>{initialPopulation}</h3> 
            </div>  
            <div className='input'>
                    <div>
                    <p>Initial population</p>
                    <input type='range' defaultValue={50} onChange={(e)=>props.changePopulationSize(e)} />                           
                </div>
                <h3 className='inputValue'>{initialPopulation}</h3> 
            </div>    
      </>
    )
}
