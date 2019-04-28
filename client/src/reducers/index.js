import { combineReducers } from 'redux'
import playerReducer from './playerReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import commentReducer from './commentReducer'

export default combineReducers({
  player: playerReducer,
  auth: authReducer,
  error: errorReducer,
  comment: commentReducer
})
