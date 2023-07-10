import { useSelector} from "react-redux";
import RoverCard from "./roverCards";
import Item from "@mui/material/Grid";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Home = () => {
  const rovers = useSelector((state) => state.rovers);

  // console.log('home.js')
  // console.log(rovers)

  return rovers.length === 0 ? (
    <Box justifyContent="space-evenly" sx={{ width: "100%", display: "flex" }}>
      <CircularProgress sx={{ width: "500px", height: "auto" }} />
    </Box>
  ) : (
    <Grid container justifyContent="space-evenly" rowSpacing={4}>
      {rovers.rovers.map((c) => (
        <Grid item xs={5} columns={12}>
          <Item>
            <RoverCard key={c} rover={c} />
          </Item>
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
