import React,{ createContext,useReducer } from 'react'
import AppReducer from './AppReducer'
const initialState={
    globalRoundScore:[],
    globalRoundTotalScore:[],
    globalSimulationState:'Offline',
    globalInputData:[],
    visual:'bird',
    globalDNA:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0]],
    birdCount:0,
    scorecount:0,
    nnCoordinates:[],
    generationData:{
        oldGenerations:[],
        currentGeneration:[],
    },
    globalNeuralNetwork:[
        {type:'Input',neuralsCount:5,id:0,neurals:[
            {id:1,name:'1'},
            {id:2,name:'1'},
            {id:3,name:'1'},
            {id:4,name:'1'},
            {id:5,name:'1'},
        ]},
        {type:'Hidden',neuralsCount:8,id:1,neurals:[
            {id:1,name:'1'},
            {id:2,name:'1'},
            {id:3,name:'1'},
            {id:4,name:'1'},
            {id:5,name:'1'},
            {id:6,name:'1'},
            {id:7,name:'1'},
            {id:8,name:'1'},
        ]},
        {type:'Output',neuralsCount:2,id:2,neurals:[
            {id:1,name:'1'},
            {id:2,name:'1'},
        ]},
    ]
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider=({children})=>{

    const [state,dispatch]= useReducer(AppReducer,initialState);

    function setGlobalState(score){
        
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

    function setGlobalInputData(data){
        // let giData= [...state.globalInputData]
        // giData.push(data);
        // console.log(giData);
        dispatch({
            type:'GLOBAL_INPUT_DATA',
            payload:{
                data:data
            },
        })
    }

    function setGlobalSimulationState(state){
        dispatch({
            type:'SET_GLOBAL_SIMULATION_STATE',
            payload:{
                data:state
            },
        })
    }

    function setGlobalNeuralNetwork(nn){
        dispatch({
            type:'SET_GLOBAL_NEURAL_NETWORK',
            payload:{
                data:nn
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

    function setGlobalDNA(dna){
        dispatch({
            type:'SET_GLOBAL_DNA',
            payload:{
                data:dna
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

    return (<GlobalContext.Provider
        value={{
            setGlobalState,
            globalRoundScore:state.globalRoundScore,
            setGlobalRoundScore,
            globalRoundTotalScore:state.globalRoundTotalScore,
            setGlobalRoundTotalScore,
            setGlobalSimulationState,
            globalSimulationState:state.globalSimulationState,
            globalInputData:state.globalInputData,
            setGlobalInputData,
            visual:state.visual,
            setVisual,
            globalNeuralNetwork:state.globalNeuralNetwork,
            setGlobalNeuralNetwork,
            globalDNA:state.globalDNA,
            setGlobalDNA,
            nnCoordinates:state.nnCoordinates,
            updateNNCoordinates,
            generationData:state.generationData,
            updateGenerationData,
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
