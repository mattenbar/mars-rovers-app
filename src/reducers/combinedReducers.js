import { combineReducers } from 'redux'
import roverReducer from './roverReducer'



export default combineReducers({
  rovers: roverReducer,
  
})