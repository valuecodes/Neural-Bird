import React,{ createContext,useReducer } from 'react'
import AppReducer from './AppReducer'
const initialState={
    globalRoundScore:[],
    globalRoundTotalScore:[],
    birdCount:0,
    scorecount:0,
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider=({children})=>{

    const [state,dispatch]= useReducer(AppReducer,initialState);

    function setGlobalState(score){

        // console.log('Global state'+score)
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

    function setGlobalRoundScore(score){
        dispatch({
            type:'GLOBAL_ROUND_SCORE',
            payload:{
                data:score
            },
        })
    }

    function setGlobalRoundTotalScore(score){
        dispatch({
            type:'GLOBAL_ROUND_TOTAL_SCORE',
            payload:{
                data:score
            },
        })
    }

    function logUserOut(){
        console.log('conte')
        // dispatch({
        //     type:'LOG_USER_OUT',
        //     payload:{
        //         loggedIn:false,
        //         currentUser:null
        //     },
        // })
    }


    return (<GlobalContext.Provider
        value={{
            setGlobalState,
            globalRoundScore:state.globalRoundScore,
            setGlobalRoundScore,
            globalRoundTotalScore:state.globalRoundTotalScore,
            setGlobalRoundTotalScore,
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
