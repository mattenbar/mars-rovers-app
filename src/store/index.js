import { configureStore } from "@reduxjs/toolkit";
import roverReducer from './rovers-slice'
import photosReducer from './photos-slice'





const store = configureStore({
  reducer: { 
      rovers: roverReducer,
      photos: photosReducer
     },
});



export default store;