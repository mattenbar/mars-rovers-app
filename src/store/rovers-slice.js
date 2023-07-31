import { createSlice } from "@reduxjs/toolkit";


const roversSlice = createSlice({
  name: "rovers",
  initialState: { rovers: [] },
  reducers: {
    fetchRovers(state, action) {
      state.rovers = action.payload;
    },
  },
});

export const roversActions = roversSlice.actions;

export default roversSlice.reducer;
