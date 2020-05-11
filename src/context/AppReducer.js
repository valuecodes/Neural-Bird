export default (state,action)=>{
    switch(action.type){
        case 'GLOBAL_ROUND_SCORE':
            return{
                ...state,
                globalRoundScore:[...state.globalRoundScore,action.payload.data]
            }

        default:
            return state
    }
}
