import React,{ createContext,useReducer } from 'react'
import AppReducer from './AppReducer'

const initialState={
    generationalData:{
        roundScores:[],
        totalRoundScores:[],
        dna:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0]],
    }
}

export const GlobalGenerational = createContext(initialState);

export const GlobalGenerationalProvider=({children})=>{

    const [state,dispatch]= useReducer(AppReducer,initialState);

    const setGenerationalData=(roundScores,totalRoundScores,dna,generation)=>{
        dispatch({
            type:'SET_GENERATIONAL_DATA',
            payload:{
                roundScores,totalRoundScores,dna,generation
            },
        })  
    }

    return (<GlobalGenerational.Provider
        value={{
            generationalData:state.generationalData,
            setGenerationalData
        }}
       >
           {children}
       </GlobalGenerational.Provider>)
} 
