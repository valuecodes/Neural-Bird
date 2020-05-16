import React,{useContext} from 'react'
import svgs from '../../../../utils/Utils'
import {GlobalOptions} from '../../../../context/GlobalOptions'

export default function SetupOptions(props) {
    const {state}=props
    const {options,modifyOptions}=useContext(GlobalOptions);

    return (
        <div className='setupInputs'
            style={{
                visibility:state==='Offline'?'':'hidden'
            }}
        >
                <div className='setupInput'>
                    <h2>Setup</h2>
                    <button className='optionsButton'>
                    <img onClick={()=>props.openOptions()} className='optionImage' src={svgs.options}/>
                    </button>                    
                </div>
            <div className='isetup'>
                <p>Gap</p>
                    <div>        
                        <input type='range' defaultValue={50} onChange={(e)=>modifyOptions(e.target.value*2,'gapWidth')} />    
                    </div>
                    <p className='isetupValue'>{options.gapWidth}</p>
                </div>
                    <div className='isetup'>
                        <p>Birds</p>
                        <div>
                        <input type='range' defaultValue={5} onChange={(e)=>modifyOptions(e.target.value,'population')} />                           
                    </div>
                    <p className='isetupValue'>{options.population}</p> 
                </div>    

        </div>
    )
}
