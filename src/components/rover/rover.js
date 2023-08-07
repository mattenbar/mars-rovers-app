import React from "react";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import BasicTabs from "./BasicTabs";
import { useSelector } from "react-redux";
import { useParams, useLoaderData } from "react-router-dom";
import { useRouteLoaderData } from "react-router-dom";
import { photosFetch } from "../../store/photos-actions";



function Rover(props) {
  const params = useParams()
  const data = useLoaderData()
  const rovers = useRouteLoaderData("root");
  const rover = rovers.rovers.filter(r => r.name === params.name)[0]

  // return<>{console.log(rover)}</>

  return rover ? (
    <>
    {console.log(data)}
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
    <>{console.log(params.name)}</>
  );
}

export default Rover;

export async function photosLoader(roverName){

  const response = await photosFetch(roverName);
  return response;
}


