import React from 'react'

export default function FamilyVisualInfo({text}) {
    return (
        <div className='familyVisualInfo visualInfo'>
            <p>{text}</p>
            <div className='divParents parentOne'>Parent 1</div>
            <div className='divParents parentTwo'>Parent 2</div> 
        </div>
    )
}
