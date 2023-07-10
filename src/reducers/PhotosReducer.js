
const initialState = []

export default function PhotosReducer(state = initialState, action) {
  
  switch (action.type) {
    case "FETCH_ROVERS":
      return {
        ...state,
        rovers: action.payload
      }
    default:
      return state;
  }
}
