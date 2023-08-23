import { API_URL, API_KEY } from "../apiConstants";
import { photosActions } from "./photos-slice";

export const fetchPhotosData = (roverName, date) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        API_URL +
          roverName +
          "/photos" +
          API_KEY +
          "&earth_date=" +
          date.format("YYYY-MM-DD")
      );

      if (!response.ok) {
        throw new Error("Could not fetch Rovers Data");
      }

      const photosData = await response.json();

      return photosData.photos;
    };

    try {
      const photosData = await fetchData();
      dispatch(photosActions.fetchPhotos(photosData));
    } catch (error) {}
  };
};

export async function fetchPhotosBySol(roverName, sol) {
  const response = await fetch(
    API_URL + roverName + "/photos" + API_KEY + "&sol=" + sol
  );

  if (!response.ok) {
    throw new Error("Could not fetch Rovers Data");
  }

  const photosData = await response.json();

  return photosData.photos;
}

export async function fetchPhotosByEarthDate(roverName, date) {
  const response = await fetch(
    API_URL +
      roverName +
      "/photos" +
      API_KEY +
      "&earth_date=" +
      date
  );

  if (!response.ok) {
    throw new Error("Could not fetch Rovers Data");
  }

  const photosData = await response.json();

  return photosData.photos;
}

export const clearPhotosData = () => {
  return (dispatch) => {
    dispatch(photosActions.fetchPhotos([]));
  };
};
