import { combineReducers } from 'redux'
import roversReducer from './RoversReducer'

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  rovers: roversReducer,
})

export default rootReducer