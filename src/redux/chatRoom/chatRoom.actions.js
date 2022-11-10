import actionTypes from "./chatRoom.types"

export const createRoom = room => {
    return {
        type: actionTypes.CREATE_ROOM,
         payload: room
    }
}

export const roomCreated=(currRoom)=>{
    return {
        type:actionTypes.IS_ROOM_CREATED,
        payload:currRoom
    }
}