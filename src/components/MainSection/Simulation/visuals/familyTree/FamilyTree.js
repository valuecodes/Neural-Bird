import React,{useContext,useEffect,useState} from 'react'
import VisualHeader from '../VisualHeader'
import {GlobalGenerational} from '../../../../../context/GlobalGenerational'
import Generation from './Generation'
import Generations from './Generations'

export default function GenerationData() {
    const {generationalData} = useContext(GlobalGenerational)
    const [oldGenData,setOldGenData]=useState([]);
    const [idData,setIdData]=useState({});
    const [selectedParents1,setSelectedParents1]=useState([]);
    const [selectedParents2,setSelectedParents2]=useState([]);
    const [genData,setGenData]=useState([]);

    useEffect(()=>{
        let idd={}
        let gData=[...generationalData.generationData.oldGenerations]
        for(var i=0;i<gData.length;i++){
            for(var a=0;a<gData[i].length;a++){
                let id=gData[i][a].birdID
                idd[id]=gData[i][a]
            }
        }
        gData.pop()
        setOldGenData(gData);
        setIdData(idd)
        // setSelectedParents1([])
        // setSelectedParents2([])

    },[generationalData])

    const createFamilyTree=(bird)=>{

        let parents1=[];
        let parents2=[];
        let prevValues=[];

        function getParents(parent){
            let parent1=idData[parent.parent1]  
            let parent2=idData[parent.parent2]  

            parents1.push(parent.parent1)
            parents2.push(parent.parent2)

            if(prevValues[parent.parent1]!==undefined) return parent1
            if(prevValues[parent.parent2]!==undefined) return parent2            

            if(parent1!==undefined) getParents(parent1);
            if(parent2!==undefined) getParents(parent2);
            
            prevValues[parent.parent1]=parent1
            prevValues[parent.parent2]=parent2
        }    
        getParents(bird);
        setSelectedParents1(parents1)
        setSelectedParents2(parents2)
    }
    return (
        <div className='familyTree'>
            <VisualHeader header={'Family Tree'}/>
            {/* <Generations 
                genData={genData} 
                selectedParents1={selectedParents1}
                selectedParents2={selectedParents2} 
            /> */}
            <div className='generationContainer'>
                {oldGenData.map((oldGen,index)=>
                    <Generation 
                    oldGenData={oldGenData[index]} 
                    selectedParents1={selectedParents1}
                    selectedParents2={selectedParents2} 
                    />
                )} 
            </div>             
            <div className='currentGen'>
                <h3 className='genHeader currentGenHeader'>Current Gen</h3>
                {generationalData.generationData.currentGeneration.map((gen,index)=>
                    <div key={index} onClick={()=>createFamilyTree(gen)}>
                        <p>{gen.birdID}</p>
                    </div> 
                )}
            </div>
        </div>
    )
}
