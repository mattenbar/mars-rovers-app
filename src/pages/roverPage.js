import Rover from "../components/rover/rover";

function RoverPage(props) {
    return <Rover onOpenModal={props.onOpenModal} />;
  }
  
  export default RoverPage;

  export function action({ request }) {
    const searchParams = new URL(request.url).searchParams;
    const date = searchParams.get("date")
    return date
  }
