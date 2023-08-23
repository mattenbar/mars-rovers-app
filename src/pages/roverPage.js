import Rover from "../components/rover/rover";
import { fetchPhotosBySol, fetchPhotosByEarthDate } from '../store/photos-actions'
function RoverPage(props) {
    return <Rover onOpenModal={props.onOpenModal} />;
  }
  
  export default RoverPage;


  
  export async function action({ request, params }) {
 
    const rover = params.roverName
    

    const searchParams = new URL(request.url).searchParams;
    const date = searchParams.get("date")
    if(date === null){
   
      const photos = await fetchPhotosBySol(rover, 0)
      return photos
    }else{
      const photos = await fetchPhotosByEarthDate(rover, date)
      return photos
    }
  }
