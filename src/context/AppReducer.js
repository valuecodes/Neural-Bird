export default (state,action)=>{
    switch(action.type){

        case 'SET_GLOBAL_SIMULATION_STATE':

            if(action.payload.data==='Offline'){

            }
            return{
                ...state,
                globalSimulationState:action.payload.data,
                globalInputData:action.payload.data==='Offline'?[]:state.globalInputData
            }

        case 'SET_VISUAL':
            return{
                ...state,
                visual:action.payload.data
            }
 
        case 'UPDATE_NN_COORDINATES':
            return{
                ...state,
                nnCoordinates:action.payload.data
            }
        case 'MODIFY_OPTIONS':
            return{
                ...state,
                options:action.payload.data
            }
        case 'SET_GENERATIONAL_DATA':
            return{
                ...state,
                generationalData:{
                    roundScores:action.payload.roundScores,
                    totalRoundScores:action.payload.totalRoundScores,
                    dna:action.payload.dna,
                    generationData:action.payload.generation
                }
            }

        case 'RESET_GENERATIONAL_DATA':
            return{
                ...state,
                generationalData:action.payload.resetedData.generationalData
            }
        case 'SET_IN_OUT_DATA':
            let ioData=[...state.inOutData]
            if(ioData.length>35)ioData.pop();
            return{
                ...state,
                inOutData:[action.payload.data,...ioData]
            }
        default:
            return state
    }
}