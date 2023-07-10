import * as React from "react";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import BasicTabs from "./BasicTabs";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Rover(props) {
  const rovers = {...useSelector((state) => state.rovers)};

  let currentRover = {};
 
  

  if (Object.keys(rovers).length > 0) {
    console.log(rovers);
    currentRover = rovers.rovers.filter((x) => x.name === props.rover)[0];
  }

  return (
    <React.Fragment>
      <Container
        maxWidth="lg"
        sx={{ display: "flex", height: "100vh", flexDirection: "column" }}
      >
        <ImageList sx={{ width: "100%", height: "100%", borderRadius: "4px" }}>
          <ImageListItem key="Subheader" cols={2}>
            <ListSubheader component="div">
              {Object.keys(currentRover).length > 0 ? (
                <BasicTabs
                  rover={currentRover}
                />
              ) : (
                <Box
                  justifyContent="space-evenly"
                  sx={{ width: "100%", display: "flex" }}
                >
                  <CircularProgress sx={{ width: "500px", height: "auto" }} />
                </Box>
              )}
            </ListSubheader>
          </ImageListItem>
        </ImageList>
      </Container>
      <br />
      <br />
    </React.Fragment>
  );
}
