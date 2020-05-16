import React,{ createContext,useReducer } from 'react'
import AppReducer from './AppReducer'

const initialState={
    globalSimulationState:'Offline',
    visual:'bird',
    nnCoordinates:[],
    generationData:{
        oldGenerations:[],
        currentGeneration:[],
    },
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider=({children})=>{

    const [state,dispatch]= useReducer(AppReducer,initialState);

    function setGlobalSimulationState(state){
        dispatch({
            type:'SET_GLOBAL_SIMULATION_STATE',
            payload:{
                data:state
            },
        })
    }

    function setVisual(page){
        dispatch({
            type:'SET_VISUAL',
            payload:{
                data:page
            },
        })
    }


    function updateNNCoordinates(cor){
        if(cor.length!==state.nnCoordinates.length){
            dispatch({
                type:'UPDATE_NN_COORDINATES',
                payload:{
                    data:cor,
                },
            })            
        }
    }

    function updateGenerationData(data){
        if(data.oldGenerations.length!==state.generationData.oldGenerations.length){
            dispatch({
                type:'UPDATE_GENERATION_DATA',
                payload:{
                    data:data
                },
            })   
        }
         
    }

    const modifyOptions=(newValue,optionName)=>{
        if(!isNaN(newValue))newValue=Number(newValue)
        let modifiedOptions={...state.options};
        modifiedOptions[optionName]=newValue;
        dispatch({
            type:'MODIFY_OPTIONS',
            payload:{
                data:modifiedOptions
            },
        })  
    }

    const setGenerationalData=(roundScores,totalRoundScores,dna,generation)=>{
        dispatch({
            type:'SET_GENERATIONAL_DATA',
            payload:{
                roundScores,totalRoundScores,dna,generation
            },
        })  
    }

    return (<GlobalContext.Provider
        value={{
            setGlobalSimulationState,
            globalSimulationState:state.globalSimulationState,
            visual:state.visual,
            setVisual,

            nnCoordinates:state.nnCoordinates,
            updateNNCoordinates,
            generationData:state.generationData,
            updateGenerationData,

            options:state.options,
            modifyOptions,
            generationalData:state.generationalData,
            setGenerationalData
        }}
       >
           {children}
       </GlobalContext.Provider>)
} 
