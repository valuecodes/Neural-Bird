import React,{ createContext,useReducer } from 'react'
import AppReducer from './AppReducer'

const initialState={
    globalSimulationState:'Offline',
    visual:'',
    nnCoordinates:[],
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

    return (<GlobalContext.Provider
        value={{
            setGlobalSimulationState,
            globalSimulationState:state.globalSimulationState,
            visual:state.visual,
            setVisual,
            nnCoordinates:state.nnCoordinates,
            updateNNCoordinates,
        }}
       >
           {children}
       </GlobalContext.Provider>)
} 
