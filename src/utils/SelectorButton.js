import React from 'react'

export default function SelectorButton(props) {
    const {header,option,selected}=props
    return (
        <div 
            className='selectorButton' 
            onClick={(e)=>props.changeValue(option)}
            style={{backgroundColor:selected?'#a8a8a8':'lightgray'}}
            >
            <p>{header}</p>
        </div>
    )
}
