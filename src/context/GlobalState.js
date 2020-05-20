import React,{ createContext,useReducer } from 'react'
import AppReducer from './AppReducer'

const initialState={
    globalSimulationState:'Offline',
    visual:'nn',
    nnCoordinates:[],
    activePage:'landing'
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
        console.log(page)
        dispatch({
            type:'SET_VISUAL',
            payload:{
                data:page
            },
        })
    }


    function updateNNCoordinates(cor){
        if(cor.length!==state.nnCoordinates.length){
            console.log(cor)
            dispatch({
                type:'UPDATE_NN_COORDINATES',
                payload:{
                    data:cor,
                },
            })            
        }
    }

    function setActivePage(page){
        dispatch({
            type:'SET_ACTIVE_PAGE',
            payload:{
                data:page
            }
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
            activePage:state.activePage,
            setActivePage
        }}
       >
           {children}
       </GlobalContext.Provider>)
} 
