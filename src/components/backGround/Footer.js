import React from 'react'
import svgs from './../../utils/Utils' 

export default function Footer() {
    return (
        <div className='footer'> 
            <div></div>
            <div className='contact'>
                <a href="https://github.com/valuecodes/Neural-Birds">
                    <img className='link' alt='Link to github' className='infosvg' src={svgs.github}/>                 
                </a>
            </div>     
            <div className='copyright'>
                <p>&copy;2020 <span className='cspan'>Neural Birds</span> by <span className='cspan'>Juha Kangas</span> </p>  
            </div>

        </div>
    )
}
