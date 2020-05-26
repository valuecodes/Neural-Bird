import React,{useContext} from 'react'
import {GlobalContext} from '../../context/GlobalState'
import svgs from './../../utils/Utils'

export default function NavBar() {
    const { setActivePage,activePage,setVisual }=useContext(GlobalContext)

    return (
        <div className='navbar'>
            <div className='logo'><img
            style={{
                display:window.innerWidth<1050&&activePage!=='landing'?'none':''
            }}
            alt={'Main Logo'} className='mainLogo' src={svgs.mainLogo}/></div>
            <button onClick={()=>setActivePage('simulation')}>Simulation</button>
            <button onClick={()=>setActivePage('playMode')}>Play</button>
        </div>
    )
}
