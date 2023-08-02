import { API_URL, API_KEY } from "../apiConstants";
import { roversActions } from "./rovers-slice";

export const fetchRoversData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(API_URL + API_KEY);

      if (!response.ok) {
        throw new Error("Could not fetch Rovers Data");
      }

      const roverData = await response.json();

      return roverData;
    };

    try {
      const roverData = await fetchData();
      dispatch(roversActions.fetchRovers(roverData.rovers));
    } catch (error) {}
  };
};

