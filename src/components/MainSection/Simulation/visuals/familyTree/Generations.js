import React,{useState,useEffect} from 'react'

export default function Generation({genData,selectedParents1,selectedParents2}) {
    const getBackGoundColor=(id)=>{
        if(selectedParents1.includes(id)){
            return 'white'
        }else if(selectedParents2.includes(id)){
            return 'gray'
        }else{
            return 'rgb(134, 180, 137)'
        }
    }

    return (
        <div className='generation generationContainer'>
            {genData.map((gen,index)=>
                <div 
                    key={index} 
                    className='oldgen'id={gen.birdID}
                    style={{
                        backgroundColor:getBackGoundColor(gen.birdID)
                    }}
                >
                    <div>
                        <p >{(gen.fitness*100).toFixed(1)}%</p>
                    </div>
                    
                </div>
            )}

        </div>
    )
}
