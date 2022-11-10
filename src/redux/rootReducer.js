import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import userReducer from "./user/user.reducer";
import chatRoomReducer from './chatRoom/chatRoom.reducer';

//local storage
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    blacklist:['chatRoom']
}
const rootReducer = combineReducers({
    user: userReducer,
    chatRoom:chatRoomReducer
})

export default  persistReducer(persistConfig,rootReducer)