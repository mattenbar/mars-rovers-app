import { API_URL, API_KEY } from "../apiConstants";
import { photosActions } from "./photos-slice";




export  const photosFetch = async (roverName,date) => {
  const response = await fetch(
    API_URL +
    roverName +
    "/photos" +
    API_KEY +
    "&earth_date=" +
    date.format("YYYY-MM-DD"));

  if (!response.ok) {
    throw new Error("Could not fetch Rovers Data");
  }

  const photosData = await response.json();
 
  return photosData.photos;
};




export const fetchPhotosData = (roverName,date) => {
  return async (dispatch) => {
    
    try {
      const photosData = await photosFetch(roverName,date);
      dispatch(photosActions.fetchPhotos(photosData));
      return photosData
    } catch (error) {}
  };
};



export const clearPhotosData = () => {
  return (dispatch) => {
    dispatch(photosActions.fetchPhotos([]));
  };
};


