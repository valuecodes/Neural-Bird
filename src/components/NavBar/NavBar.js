import React,{useContext} from 'react'
import {GlobalContext} from '../../context/GlobalState'
import svgs from './../../utils/Utils'

export default function NavBar() {
    const { setActivePage }=useContext(GlobalContext)
    return (
        <div className='navbar'>
            <div className='logo'><img
            style={{
                // height:activePage==='simulation'?
            }}
            alt={'Main Logo'} className='mainLogo' src={svgs.mainLogo}/></div>
            <button onClick={()=>setActivePage('simulation')}>Simulation</button>
            <button onClick={()=>setActivePage('playMode')}>Play</button>
            {/* <button onClick={()=>setActivePage('leaderboards')}>Leaderboards</button> */}
        </div>
    )
}
