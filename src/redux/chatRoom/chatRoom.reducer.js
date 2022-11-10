import actionTypes from "./chatRoom.types"
const INITIAL_STATE={
    room:null,
    isRoomCreated:false
}



const chatRoomReducer=(state=INITIAL_STATE,action)=>{

    switch(action.type){
        case actionTypes.CREATE_ROOM:
            return {
                ...state,
                room:action.payload
            }
        case actionTypes.IS_ROOM_CREATED:
            return {
                ...state,
                isRoomCreated:action.payload
            }
        default:
            return state
    }
}

export default chatRoomReducer