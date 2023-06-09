import { useSelector} from "react-redux";
import RoverCard from "./roverCards";
import Item from "@mui/material/Grid";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";


const Home = (props) => {
  const rovers = useSelector((state) => state.rovers);

  return rovers.length === 0 ? (
    <Box justifyContent="space-evenly" sx={{ width: "100%", display: "flex" }}>
      <CircularProgress sx={{ width: "500px", height: "auto" }} />
    </Box>
  ) : (
    <Grid id='home-grid' sx={{ height: "auto", padding: '24px' }} container justifyContent="space-between" rowSpacing={4}>
      {rovers.rovers.map((c) => (
        
        <Grid key={c.id} item xs={5.8}>
          
          <Item>
            <RoverCard rover={c} />
          </Item>
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
