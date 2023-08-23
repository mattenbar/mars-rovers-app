import React from "react";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import BasicTabs from "./BasicTabs";
import { useLoaderData, useParams,} from "react-router-dom";
import { useRouteLoaderData } from "react-router-dom";

function Rover(props) {
  const params = useParams();
  const rovers = useRouteLoaderData("root");
  const photos = useLoaderData()

  const rover = rovers.rovers.filter((r) => r.name === params.roverName)[0];


  return rover ? (
    <>
      <Container
        maxWidth="80vw"
        sx={{
          display: "flex",
          height: "auto",
          flexDirection: "column",
          padding: "0 !important",
        }}
      >
        <ImageList sx={{ width: "100%", height: "auto", borderRadius: "4px" }}>
          <ImageListItem key="Subheader" cols={2}>
            <ListSubheader component="div" sx={{ padding: 0 }}>
              <BasicTabs rover={rover} onOpenModal={props.onOpenModal} photos={photos}/>
            </ListSubheader>
          </ImageListItem>
        </ImageList>
      </Container>
    </>
  ) : (
    <>
      
    </>
  );
}

export default Rover;

