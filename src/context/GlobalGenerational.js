import React,{ createContext,useReducer } from 'react'
import AppReducer from './AppReducer'
// import axios from 'axios'

const initialState={
    generationalData:{
        roundScores:[],
        totalRoundScores:[],
        dna:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0]],
        generationData:{
            oldGenerations:[],
            currentGeneration:[],
        },
    }
}

export const GlobalGenerational = createContext(initialState);

export const GlobalGenerationalProvider=({children})=>{

    const [state,dispatch]= useReducer(AppReducer,initialState);

    const setGenerationalData=(roundScores,totalRoundScores,dna,generation,reset)=>{
        dispatch({
            type:'SET_GENERATIONAL_DATA',
            payload:{
                roundScores,totalRoundScores,dna,generation
            },
        })  
    }

    const resetGenerationalData=()=>{
        let resetedData={
            generationalData:{
                roundScores:[],
                totalRoundScores:[],
                dna:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0]],
                generationData:{
                    oldGenerations:[],
                    currentGeneration:[],
                },
            }
        }
        dispatch({
            type:'RESET_GENERATIONAL_DATA',
            payload:{
                resetedData
            },
        }) 
    }

    // const saveDataToServer=async(alfa)=>{
    //     try{
    //         const config={
    //             headers:{
    //                 'Content-Type':'application/json',
    //             }
    //         }
    //         let data={
    //             alfa
    //         }
    //         const res=await axios.post('/saveData',data,config)      
    //     }catch(err){
    //         console.log('Error')
    //     }
    // }

    return (<GlobalGenerational.Provider
        value={{
            generationalData:state.generationalData,
            setGenerationalData,
            resetGenerationalData,
            // saveDataToServer
        }}
       >
           {children}
       </GlobalGenerational.Provider>)
} 
