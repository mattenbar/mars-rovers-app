import * as React from "react";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import BasicTabs from "./BasicTabs";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Rover(props) {
  const rovers = { ...useSelector((state) => state.rovers) };

  let currentRover = {};

  if (Object.keys(rovers).length > 0) {
    
    currentRover = rovers.rovers.filter((x) => x.name === props.rover)[0];
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", height: "auto", flexDirection: "column" }}
    >
     
      <ImageList sx={{ width: "100%", height: "auto", borderRadius: "4px" }}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">
            {Object.keys(currentRover).length > 0 ? (
              <BasicTabs rover={currentRover} onOpenModal={props.onOpenModal}/>
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
  );
}

export default Rover;
