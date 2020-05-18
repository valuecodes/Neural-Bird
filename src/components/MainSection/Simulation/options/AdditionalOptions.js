import React,{useState} from 'react'
import OptionSlider from './optionComponents/OptionsSlider' 

export default function AdditionalOptions({optionsOpen,state}) {
    const [enviromentOptions]=useState([
        {
            id:'closingRate',
            name:'Closing Rate',
            min:100,max:9999,def:5000,type:'p',
            add:[],
            desc:'Pipe gap closing by 1 every time score is reaches closing rate'
        },
        {
            id:'pipeRate',
            name:'Number of pipes',
            min:30,max:270,def:140,type:'',
            add:['rtl','/',30,'reverse'],
            desc:'How many pipes on the screen at the same time'
        },
        {
            id:'hardness',
            name:'Hardness Rate',
            min:0,max:50,def:25,type:'%',
            add:['rtl','*',2,'reverse'],
            desc:'How fast pipes diverse from the center'
        },
        {
            id:'choiceRate',
            name:'Choice confidence',
            min:1,max:99,def:55,type:'%',
            add:[],
            desc:'How confident the bird must be to jump'
        },
    ])

    const [crossOverOptions]=useState([
        {
            id:'poolSize',
            name:'Pool Size',
            min:2,max:100,def:10,type:'pcs',
            add:[],
            desc:'How many top scroring birds from the generation are chosen to the mating pool'
        },
        {
            id:'selectionPower',
            name:'Selection Power',
            min:0,max:5,def:1,type:'',
            add:[],
            desc:'Bird score is multiplied by power so highest scoring birds are more likely to pass genes on'
        },
    ])

    const [mutationOptions]=useState([
        {
            id:'mutateRate',
            name:'Mutate Rate',
            min:0,max:50,def:10,type:'%',
            add:[],
            desc:'Bird mutation change'
        },
        {
            id:'recreateRate',
            name:'Recreate Rate',
            min:0,max:2000,def:100,type:'p',
            add:[],
            desc:'If bird score is less than n, create new random bird to avoid cycle of bad generations'
        },
    ])

    return (
        <div 
        className='additionaOptions' 
        style={{
            width:optionsOpen?"100vw":0,
            display:state==='Offline'?'':'none'
        }}>
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
                            add={option.add}
                            desc={option.desc}
                        />
                    )}
                </div>
                <div className='aOptionContainer'>
                    <h2>Crossover Options</h2>
                    {crossOverOptions.map(option=>
                        <OptionSlider
                            key={option.id}
                            id={option.id}
                            name={option.name} 
                            min={option.min}
                            max={option.max}
                            def={option.def}
                            type={option.type}
                            add={option.add}
                            desc={option.desc}
                        />
                    )}
                </div>
                <div className='aOptionContainer'>
                    <h2>Mutation Options</h2>
                    {mutationOptions.map(option=>
                        <OptionSlider
                            key={option.id}
                            id={option.id}
                            name={option.name} 
                            min={option.min}
                            max={option.max}
                            def={option.def}
                            type={option.type}
                            add={option.add}
                            desc={option.desc}
                        />
                    )}
                </div>
        </div>
      </div>
    )
}
