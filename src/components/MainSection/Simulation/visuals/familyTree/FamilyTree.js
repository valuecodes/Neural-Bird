import React,{useContext} from 'react'
import VisualHeader from '../VisualHeader'
import {GlobalGenerational} from '../../../../../context/GlobalGenerational'
import Generation from './Generation'

export default function GenerationData() {
    const {generationalData} = useContext(GlobalGenerational)
    return (
        <div className='familyTree'>
            <VisualHeader header={'Family Tree'}/>
            <div className='generationContainer'>
                {generationalData.generationData.oldGenerations.map((oldGen,index)=>
                    <Generation key={index} oldGen={oldGen}/>
                )}
            </div>                
            <div className='currentGen'>
                {generationalData.generationData.currentGeneration.map((gen,index)=>
                    <div key={index}>
                        <p>{gen[0]}{gen[1]}</p>
                    </div> 
                )}
            </div>
        </div>
    )
}
