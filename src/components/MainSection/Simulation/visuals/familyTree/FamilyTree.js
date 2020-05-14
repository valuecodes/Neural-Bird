import React,{useContext,useEffect} from 'react'
import VisualHeader from '../VisualHeader'
import {GlobalContext} from '../../../../../context/GlobalState'
import Generation from './Generation'

export default function GenerationData() {
    const {generationData}=useContext(GlobalContext);
    return (
        <div className='familyTree'>
            <VisualHeader header={'Family Tree'}/>
            <div className='generationContainer'>
                {generationData.oldGenerations.map((oldGen,index)=>
                    <Generation key={index} oldGen={oldGen}/>
                )}
            </div>                
            <div className='currentGen'>
                {generationData.currentGeneration.map((gen,index)=>
                    <>
                        <p key={index}>{gen[0]}{gen[1]}</p>
                    </> 
                )}
            </div>
        </div>
    )
}
