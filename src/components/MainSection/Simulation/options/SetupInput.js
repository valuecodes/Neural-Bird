import React from 'react'
import svgs from '../../../../utils/Utils'

export default function SetupInput(props) {
    const {gapWidth,initialPopulation,state}=props
    return (
        <div className='setupInputs'
            style={{
                visibility:state==='Online'?'hidden':''
            }}
        >
                <div className='setupInput'>
                    <h2>Setup</h2>                          <button className='optionsButton'>
                    <img onClick={()=>props.openOptions()} className='optionImage' src={svgs.options}/>
                    </button>                    
                </div>
            <div className='isetup'>
                <p>Gap</p>
                    <div>        
                        <input type='range' defaultValue={50} onChange={(e)=>props.changeGapWidth(e)} />    
                    </div>
                    <p className='isetupValue'>{gapWidth/2}</p>
                </div>
                    <div className='isetup'>
                        <p>Birds</p>
                        <div>
                        <input type='range' defaultValue={5} onChange={(e)=>props.changePopulationSize(e)} />                           
                    </div>
                    <p className='isetupValue'>{initialPopulation}</p> 
                </div>    

        </div>
    )
}
