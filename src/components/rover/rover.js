import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import BasicTabs from "./BasicTabs";
import Nav from '../nav'



export default function Rover(props) {


  return (
    <React.Fragment>
      <CssBaseline />
      {console.log('props before nav')}
      {console.log(props)}
      <div className="Nav">
        <Nav rovers={props.rovers}/>
      </div>
      <Container
        maxWidth="lg"
        sx={{ display: "flex", height: "100vh", flexDirection: "column" }}
      >

        <ImageList sx={{ width: "100%", height: "100%" , borderRadius:'4px'}}>
          <ImageListItem key="Subheader" cols={2}>
            <ListSubheader component="div">
              <BasicTabs sx={{}}
                rover={props.rover}
              />
            </ListSubheader>
          </ImageListItem>
        </ImageList>
      </Container>
      <br />
      <br />
    </React.Fragment>
  );
}
