import React,{useContext} from 'react'
import {GlobalContext} from '../../../../context/GlobalState'
import OptionButton from './../../../../utils/OptionButton'

export default function VisualHeader(props) {
    const { header,option } = props
    const { activePage }=useContext(GlobalContext);
    return (
        <div className='visualHeader'
            style={{visibility:activePage==='simulation'?'visible':'hidden'}}>
            <h1>{header}</h1>
            <OptionButton 
                changeSettings={props.changeSettings} 
                option={option} 
            />
        </div>
    )
}
