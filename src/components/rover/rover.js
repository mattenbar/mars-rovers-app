import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import BasicTabs from "./BasicTabs";
import { useSelector } from "react-redux";



function Rover(props) {

  const rover = useSelector((state) => state.rovers.rovers.filter(r => r.name === props.roverName)[0])

  return !!rover ? (
    <>
    
     <Container
      maxWidth="80vw"
      sx={{ display: "flex", height: "auto", flexDirection: "column", padding: '0 !important' }}
    >
      <ImageList sx={{ width: "100%", height: "auto", borderRadius: "4px" }}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div" sx={{padding:0}}>
            <BasicTabs rover={rover} onOpenModal={props.onOpenModal} />
          </ListSubheader>
        </ImageListItem>
      </ImageList>
    </Container>
    </>
   
  ) : (
    <></>
  );
}

export default Rover;


