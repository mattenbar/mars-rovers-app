export default function manageRovers(state = [], action) {
  switch (action.type) {
    case "FETCH_ROVERS":
      return state.concat(action.payload);
    default:
      return state;
  }
}
