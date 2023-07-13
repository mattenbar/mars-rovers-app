import { API_URL, API_KEY } from '../apiConstants';

const FETCH_ROVERS = "FETCH_ROVERS"

export function fetchRovers(){

  return function(dispatch){
    
    fetch(API_URL  + API_KEY)
      .then(res => res.json())
      .then(resObj => {

        dispatch({type: FETCH_ROVERS, payload: resObj.rovers})
      })
    }
}

