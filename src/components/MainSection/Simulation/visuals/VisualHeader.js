import React,{useContext} from 'react'
import {GlobalContext} from '../../../../context/GlobalState'
export default function VisualHeader({header}) {
    const { activePage }=useContext(GlobalContext);
    return (
        <div className='visualHeader'
            style={{
                visibility:activePage==='simulation'?'visible':'hidden'
            }}
        >
            <h1>{header}</h1>
        </div>
    )
}
