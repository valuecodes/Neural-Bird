import React from 'react'

export default function CheckBoxInput(props) {
    const {header,option}=props
    return (
        <div className='checkBoxInput'>
            <input 
                className='checkBox' 
                type='checkBox' 
                onClick={(e)=>props.checked(option)}
            />
            <p>{header}</p>
        </div>
    )
}
