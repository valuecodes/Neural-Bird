import React,{useState,useContext} from 'react'
import {GlobalOptions} from '../../../../context/GlobalOptions'
import OptionSlider from './OptionsSlider' 

export default function AdditionalOptions(props) {
    const [enviromentOptions]=useState([
        {id:'closingRate',name:'Closing Rate',min:100,max:9999,def:5000,type:''},
        {id:'mutateRate',name:'Mutate Rate',min:0,max:50,def:10,type:'%'},
        {id:'hardness',name:'Hardness',min:0,max:100,def:20,type:'%'},
    ])

    const [crossOverOptions]=useState([
        {id:'closingRate',name:'Closing Rate',min:100,max:9999,def:5000,type:''},
        {id:'mutateRate',name:'Mutate Rate',min:0,max:50,def:10,type:'%'},
        {id:'hardness',name:'Hardness',min:0,max:100,def:20,type:'%'},
    ])

    const [mutationOptions]=useState([
        {id:'closingRate',name:'Closing Rate',min:100,max:9999,def:5000,type:''},
        {id:'mutateRate',name:'Mutate Rate',min:0,max:50,def:10,type:'%'},
        {id:'hardness',name:'Hardness',min:0,max:100,def:20,type:'%'},
    ])

    return (
        <div className='inputContainer'>
            <div className='aOptionHeader'>                
                <h2>Additional Settings</h2> 
            </div>  
            <div className='aOptionContainer'>
                <h2>Enviromental Options</h2>
                {enviromentOptions.map(option=>
                    <OptionSlider
                        key={option.id}
                        id={option.id}
                        name={option.name} 
                        min={option.min}
                        max={option.max}
                        def={option.def}
                        type={option.type}
                    />
                )}
            </div>
            <div className='aOptionContainer'>
                <h2>Crossover Options</h2>
                {enviromentOptions.map(option=>
                    <OptionSlider
                        key={option.id}
                        id={option.id}
                        name={option.name} 
                        min={option.min}
                        max={option.max}
                        def={option.def}
                        type={option.type}
                    />
                )}
            </div>
            <div className='aOptionContainer'>
                <h2>Mutation Options</h2>
                {enviromentOptions.map(option=>
                    <OptionSlider
                        key={option.id}
                        id={option.id}
                        name={option.name} 
                        min={option.min}
                        max={option.max}
                        def={option.def}
                        type={option.type}
                    />
                )}
            </div>
      </div>
    )
}
