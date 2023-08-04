
import RoverCard from "./roverCards";
import Item from "@mui/material/Grid";
import { Grid } from "@mui/material";
import {roversFetch} from '../../store/rover-actions'
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const rovers = useLoaderData()
  return (
    <Grid
      id="home-grid"
      sx={{ maxWidth: "100%", margin: "auto" }}
      container
      spacing={2}
    >
      {rovers.rovers.map((c) => (
        <Grid
        key={c.name}
          sx={{
            display: "flex",
            width: '90%',
            justifyContent: "center",
            padding: '0 !important'
          }}
          xs={6}
          item={true}
        >
          <Item sx={{width:'98%', marginBottom: '5vh', display:'flex', justifyContent: 'center', }}>
            <RoverCard  rover={c} />
          </Item>
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;

export async function roversLoader(){
  const response = await roversFetch();
  return response;
}