import React,{ createContext,useReducer } from 'react'
import AppReducer from './AppReducer'
const initialState={
    generation:0,
    birdCount:0,
    scorecount:0,
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider=({children})=>{

    const [state,dispatch]= useReducer(AppReducer,initialState);

    function setGlobalState(){
        console.log('Global state')
        // dispatch({
        //     type:'LOG_USER_IN',
        //     payload:{
        //         loggedIn:true,
        //         currentUser:user,
        //         portfolio:user.portfolio
        //     },
        // })
        // console.log('logging user in...')
    }


    return (<GlobalContext.Provider
        value={{
            // portfolio:state.portfolio,
            // logUserIn,
            // logUserOut,
            // currentUser:state.currentUser,
            // loggedIn:state.loggedIn,
            // addTicker,
            // deleteTicker,
        }}
       >
           {children}
       </GlobalContext.Provider>)
} 
