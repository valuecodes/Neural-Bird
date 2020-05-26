import React,{useContext,useEffect,useState} from 'react'
import VisualHeader from '../VisualHeader'
import {GlobalGenerational} from '../../../../../context/GlobalGenerational'
import Generation from './Generation'
import GenerationOptions from './GenerationOptions'
import CurrentGeneration from './CurrentGeneration'
import FamilyVisualInfo from './FamilyVisualInfo'

export default function GenerationData() {

    const {generationalData} = useContext(GlobalGenerational)
    const [oldGenData,setOldGenData]=useState([]);
    const [idData,setIdData]=useState({});
    const [settings,setSettings]=useState({
        optionsOpen:false,
        treeGraph:false,
        showFitness:false,
        colors:false,
        selectedValue:'birdID',
        selectedParents1:[],
        selectedParents2:[]
    })

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
        if(gData.length===0) resetSettings();
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
        let newSettings={...settings}
        newSettings.selectedParents1=parents1;
        newSettings.selectedParents2=parents2;
        setSettings(newSettings)
    }

    const changeSettings=(option)=>{
        let newSettings={...settings}
        newSettings[option]=!newSettings[option]
        setSettings(newSettings);
    }

    const changeSettingsValue=(value)=>{
        let newSettings={...settings}
        newSettings.selectedValue=value;
        setSettings(newSettings);
    }

    const resetSettings=()=>{
        let newSettings={...settings}
        newSettings.selectedParents1=[];
        newSettings.selectedParents2=[];
        setSettings(newSettings)
    }

    return (
        <div className='familyTree'>
            <VisualHeader header={'Family Tree'} changeSettings={changeSettings} option={'optionsOpen'}/>
            <GenerationOptions 
                changeSettings={changeSettings} 
                changeSettingsValue={changeSettingsValue}
                settings={settings}/>
            <FamilyVisualInfo text={'Run simulation and select bird from Current Gen'}/>
            <div className='generationContainer'
                style={{maxHeight:settings.optionsOpen?400:500}}
            >
                {oldGenData.map((oldGen,index)=>
                    <Generation
                        key={index}
                        oldGenData={oldGenData[index]}
                        settings={settings}
                        createFamilyTree={createFamilyTree} 
                    />
                )} 
            </div>   
            <CurrentGeneration 
                currentGeneration={generationalData.generationData.currentGeneration} 
                createFamilyTree={createFamilyTree}    
            />          
        </div>
    )
}
