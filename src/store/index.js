import { configureStore } from "@reduxjs/toolkit";
import roverReducer from './rovers-slice'





const store = configureStore({
  reducer: { 
      rovers: roverReducer,
     
     },
});



export default store;