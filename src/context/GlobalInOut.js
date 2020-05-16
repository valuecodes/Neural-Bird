import React,{ createContext,useReducer } from 'react'
import AppReducer from './AppReducer'

const initialState={
    inOutData:[]
}

export const GlobalInOut = createContext(initialState);

export const GlobalInOutProvider=({children})=>{

    const [state,dispatch]= useReducer(AppReducer,initialState);

    function setGlobalInOutData(data){
        dispatch({
            type:'SET_IN_OUT_DATA',
            payload:{
                data:data
            },
        })
    }

    return (<GlobalInOut.Provider
        value={{
            inOutData:state.inOutData,
            setGlobalInOutData
        }}
       >
           {children}
       </GlobalInOut.Provider>)
} 
