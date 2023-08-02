
import { useSelector } from "react-redux";
import RoverCard from "./roverCards";
import Item from "@mui/material/Grid";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Home = () => {
  const rovers = useSelector((state) => state.rovers);

  return rovers.length === 0 ? (
    <Box justifyContent="space-evenly" sx={{ width: "100%", display: "flex" }}>
      <CircularProgress sx={{ width: "500px", height: "auto" }} />
    </Box>
  ) : (
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
          }}
          xs={6}
        >
          <Item sx={{width:'98%', marginBottom: '5vh', display:'flex', justifyContent: 'center'}}>
            <RoverCard  rover={c} />
          </Item>
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
