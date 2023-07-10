import { API_URL, API_KEY } from '../apiConstants';

const FETCH_ROVERS = "FETCH_ROVERS"

export function fetchRovers(){

  return function(dispatch){
    
    fetch(API_URL  + API_KEY)
      .then(res => res.json())
      .then(resObj => {
        console.log('in fetch rovers')
        console.log(resObj.rovers)
        dispatch({type: FETCH_ROVERS, payload: resObj.rovers})
      })
    }
}

