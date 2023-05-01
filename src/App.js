import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { API_KEY, API_URL } from "./apiConstants";
import {SampleRovers} from './sampleRovers'
import {fetchRovers} from './actions/fetchRovers'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

//components
import Home from "./components/home/home";
import Rover from "./components/rover/rover";
import Nav from "./components/nav";

// function routes(rovers) {
//   return rovers.map((c) => (
//     <Route
//       key={c.name}
//       exact
//       path={"/" + c.name}
//       render={() => <Rover rover={c} />}
//     />
//   ));
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rovers: {} };
  }
  
  
  // componentWillMount() {
  //   axios.get(API_URL + API_KEY)
  //     .then((response)=>{
  //       console.log(response.data)
  //       this.setState({
  //         rovers: response.data
  //       });
  //       console.log('this.state')
  //       console.log(this.state)
  //     })
  // }

  componentDidMount(){
    this.props.dispatchFetchRovers()
  }
  
  routes = (rovers) => {
      return (rovers.map((c) => (
        <Route
          key={c.name}
          exact
          path={"/" + c.name}
          render={() => <Rover rovers={rovers} rover={c} />}
        />
      ))
    )
  }

  render() {
    return (
      <div className="App">
        <React.Fragment>
          <CssBaseline />
          <Typography id="mars-header" variant="h1" color="red">
            MARS ROVERS
          </Typography>

          <Container
            maxWidth="lg"
            sx={{ display: "flex", height: "100%", justifyContent: "center" }}
          >
            
          </Container>

          <Container maxWidth="lg" sx={{ display: "flex", height: "100%", flexWrap:'wrap' }}>
            <Switch>
              <Route
                key={"home"}
                exact
                path="/"
                render={() => <Home rovers={this.state} />}
              />
              {this.routes(this.props.rovers)}
            </Switch>
          </Container>
        </React.Fragment>
      </div>
    );
  }
}

function mSTP(state){
  return {
    rovers: state.rovers
  }
}

function mDTP(dispatch){
  return {
    dispatchFetchRovers: (rovers) => dispatch(fetchRovers(rovers)),
    
  }
}

export default withRouter(connect(mSTP, mDTP)(App));
