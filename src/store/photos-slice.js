import { createSlice } from "@reduxjs/toolkit";

const photosSlice = createSlice({
  name: "photos",
  initialState: { photos: [] },
  reducers: {
    fetchPhotos(state, action) {
   
      state.photos = action.payload;
    },
  },
});

export const photosActions = photosSlice.actions;

export default photosSlice.reducer;

