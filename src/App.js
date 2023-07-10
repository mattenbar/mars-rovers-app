import React from "react";
import { Switch, Route } from "react-router-dom";
import { fetchRovers } from "./actions/fetchRovers";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "./components/header/Header";


//CSS
import "./App.css";

//components
import Home from "./components/home/home";
import Rover from "./components/rover/rover";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

const roverNames = ["Curiosity", "Spirit", "Opportunity", "Perservernce"];


const routes = roverNames.map((c) => (
  <Route
    key={c}
    exact
    path={"/" + c}
    render={() => <Rover roverNames={roverNames}  rover={c} />}
  />
));


class App extends React.Component {
  
  
  render() {
    
    return (
      
        <Container
          maxWidth="lg"
          sx={{ display: "flex", height: "100%", flexWrap: "wrap" }}
        >
          <CssBaseline />
          <Header roverNames={roverNames} />
          <Switch>
            <Route key="home" exact path="/" render={() => <Home />} />
            {routes}
          </Switch>
        </Container>
      
    );
  }
}

function mSTP(state) {
  return {
    rovers: state.rovers,
  };
}

function mDTP(dispatch) {
  return {
    dispatchFetchRovers: (rovers) => dispatch(fetchRovers(rovers)),
  };
}

export default withRouter(connect(mSTP, mDTP)(App));
