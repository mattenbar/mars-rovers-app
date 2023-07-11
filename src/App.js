import React from "react";
import { Switch, Route } from "react-router-dom";
import { fetchRovers } from "./actions/fetchRovers";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "./components/header/Header";
import ImageModal from "./components/rover/ImageModal";

//CSS
import "./App.css";

//components
import Home from "./components/home/home";
import Rover from "./components/rover/rover";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

const roverNames = ["Curiosity", "Spirit", "Opportunity", "Perseverance"];

function handleOpenModal(data) {
  console.log("in open function", data.target['__reactProps$qm4km4ggqg'].orignalSrc);
  return this.setState({
    displayModal: true,
    imgSrc: data.target['__reactProps$qm4km4ggqg'].orignalSrc
  });
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      displayModal: false,
      imgSrc: "",
    };
    this.handleCloseEvent = this.handleCloseEvent.bind(this);
    this.handleOpenModal = handleOpenModal.bind(this);
  }

  handleCloseEvent = () => {
    return this.setState({
      displayModal: false,
    });
  };

  render() {
    const routes = roverNames.map((c) => (
      <Route
        key={c}
        exact
        path={"/" + c}
        render={() => (
          <Rover
            onOpenModal={this.handleOpenModal.bind(this)}
            roverNames={roverNames}
            rover={c}
          />
        )}
      />
    ));

    return (
      <Container
        maxWidth="lg"
        sx={{ display: "flex", height: "auto", flexWrap: "wrap" }}
      >
        {this.state.displayModal && (
          <ImageModal imgSrc={this.state.imgSrc} onClose={this.handleCloseEvent} />
        )}
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
    rovers: state.rovers.rovers,
  };
}

function mDTP(dispatch) {
  return {
    dispatchFetchRovers: (rovers) => dispatch(fetchRovers(rovers)),
  };
}

export default withRouter(connect(mSTP, mDTP)(App));
