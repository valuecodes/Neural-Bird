export default (state,action)=>{
    switch(action.type){
        case 'GLOBAL_ROUND_SCORE':
            return{
                ...state,
                globalRoundScore:[...state.globalRoundScore,action.payload.data]
            }

        case 'GLOBAL_ROUND_TOTAL_SCORE':
            return{
                ...state,
                globalRoundTotalScore:[...state.globalRoundTotalScore,action.payload.data]
            }
        case 'SET_GLOBAL_SIMULATION_STATE':

            if(action.payload.data==='Offline'){

            }
            return{
                ...state,
                globalSimulationState:action.payload.data,
                globalInputData:action.payload.data==='Offline'?[]:state.globalInputData
            }
        case 'GLOBAL_INPUT_DATA':
            let giData=[...state.globalInputData]
            if(giData.length>35)giData.pop();
            return{
                ...state,
                globalInputData:[action.payload.data,...giData]
            }
        case 'SET_GLOBAL_NEURAL_NETWORK':
            return{
                ...state,
                globalNeuralNetwork:action.payload.data
            }
        case 'SET_VISUAL':
            return{
                ...state,
                visual:action.payload.data
            }
        case 'SET_GLOBAL_DNA':
            return{
                ...state,
                globalDNA:action.payload.data
            }
        case 'UPDATE_NN_COORDINATES':
            return{
                ...state,
                nnCoordinates:action.payload.data
            }
        default:
            return state
    }
}