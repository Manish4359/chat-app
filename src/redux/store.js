import {legacy_createStore as createStore,applyMiddleware} from 'redux'
import persistedRootReducer from './rootReducer'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'

export const store=createStore(persistedRootReducer,applyMiddleware(logger))

export const persistedStore=persistStore(store)

export default {persistedStore,store}