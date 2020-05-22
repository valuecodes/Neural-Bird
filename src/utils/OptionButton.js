import React from 'react'
import svgs from './Utils'

export default function OptionButton(props) {
    const {option}=props;
    if(option===null){
        return null        
    }else{
        return (
            <button>
                <img
                    alt='optionImage'
                    onClick={(e)=>props.changeSettings(props.option)} 
                    className='optionImage' 
                    src={svgs.options}
                /> 
            </button>
        )   
    }

}
