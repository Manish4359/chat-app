import actionTypes from "./chatRoom.types"
const INITIAL_STATE = {
    room: null,
    isRoomCreated: false
}



const chatRoomReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case actionTypes.CREATE_ROOM:
            return {
                ...state,
                room: action.payload
            }
        case actionTypes.IS_ROOM_CREATED:
            return {
                ...state,
                isRoomCreated: action.payload
            }
        case actionTypes.UPDATE_MESSAGE:
            console.log("update")
            return {
                ...state,
                room: {
                    roomId: state.room.roomId,
                    senderId: state.room.senderId,
                    receiverId: state.room.receiverId,
                    messages: action.payload
                }
            }
        default:
            return state
    }
}

export default chatRoomReducer