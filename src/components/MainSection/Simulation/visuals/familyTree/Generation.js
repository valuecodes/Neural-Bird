import React,{useState,useEffect} from 'react'

export default function Generation({oldGenData,selectedParents1,selectedParents2}) {

    const getBackGoundColor=(id)=>{
        if(selectedParents1.includes(id)){
            return 'white'
        }else if(selectedParents2.includes(id)){
            return 'gray'
        }else{
            return 'rgba(134, 180, 137,0.0)'
        }
    }

    const getDisplay=(id)=>{
        if(selectedParents1.includes(id)){
            return ''
        }else if(selectedParents2.includes(id)){
            return ''
        }else{
            return 'none'
        }
    }
    if(oldGenData.length!==0){}
    return (
        <div className='generation'>
            <h3 className='genHeader'>Gen:{oldGenData.length!==0?oldGenData[0].generation:0}</h3>
            {oldGenData.map((gen,index)=>
                <div key={index} className='oldgen'
                    id={gen.birdID}
                    style={{
                        backgroundColor:getBackGoundColor(gen.birdID),
                        // display:getDisplay(gen.birdID)
                    }}
                >
                    <div>
                        {/* <p>{(gen.fitness*100).toFixed(1)}%</p> */}
                        <p>{gen.birdID}</p>
                    </div>
                    
                    
                </div>
            )}

        </div>
    )
}
