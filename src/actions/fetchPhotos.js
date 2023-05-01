import { API_URL } from "../apiConstants";
// eslint-disable-next-line
import { format } from "date-fns";
import moment from 'moment-hijri';
import dayjs from 'dayjs';

const checkDate = (maxDate) => {
  var today = moment().format('YYYY-MM-DD')
  var defaultDate = ''
  if(moment(today).isAfter(moment(maxDate).format('YYYY-MM-DD'))){
     defaultDate = moment(maxDate).format('YYYY-MM-DD')
  }else{
     defaultDate = today
  }
  
  return dayjs(defaultDate)
}

var today = moment().format('YYYY-MM-DD')

const FetchPhotos = (data = "curiosity", date = today) => {

  var dateCheck = checkDate(data['max_date'])
  dateCheck = dateCheck.format('YYYY-MM-DD')


  fetch(
    API_URL + data.name + "/photos?api_key=4cEQfiifB9BBewxJ7ysJEGttxB7rWxf0UF26st3i&earth_date=" + dateCheck
  )
    .then((res) => res.json())
    .then((resObj) => {
     
      return resObj;
    });
};

export default FetchPhotos;
