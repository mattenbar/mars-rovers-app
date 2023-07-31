import * as React from "react";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import BasicTabs from "./BasicTabs";
import { useSelector } from "react-redux";

function Rover(props) {
  const rovers = props.rovers.rovers;
  
  const currentRover = rovers.filter(r => r.name === props.roverName)
  
  // if (Object.keys(rovers).length > 0) {
  //   currentRover = rovers.rovers.filter((x) => x.name === props.rover)[0];
  // }

  return currentRover.length > 0 ? (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", height: "auto", flexDirection: "column" }}
    >
      <ImageList sx={{ width: "100%", height: "auto", borderRadius: "4px" }}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div" sx={{padding:0}}>
            <BasicTabs rover={currentRover[0]} onOpenModal={props.onOpenModal} />
          </ListSubheader>
        </ImageListItem>
      </ImageList>
    </Container>
  ) : (
    <>{console.log('props', props, 'currentRover', currentRover  )}</>
  );
}

export default Rover;


