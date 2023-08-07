import { API_URL, API_KEY } from "../apiConstants";
import { photosActions } from "./photos-slice";
import moment from "moment-hijri";
import dayjs from "dayjs";


function checkDate(maxDate, minDate, date) {
  var defaultDate = "";

  var today = "";
  if (!!date) {
    today = moment(date["$d"]).format("YYYY-MM-DD");
  } else {
    today = moment().format("YYYY-MM-DD");
  }

  if (moment(today).isAfter(moment(maxDate).format("YYYY-MM-DD"))) {
    defaultDate = moment(maxDate).format("YYYY-MM-DD");
  } else if (moment(today).isBefore(moment(minDate).format("YYYY-MM-DD"))) {
    defaultDate = moment(minDate).format("YYYY-MM-DD");
  } else {
    defaultDate = today;
  }

  defaultDate = dayjs(defaultDate);
  return defaultDate;
}



export  const photosFetch = async (roverName, date = null) => {
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


