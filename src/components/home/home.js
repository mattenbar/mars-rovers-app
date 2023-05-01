import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import RoverCard from "./roverCards";
import Item from "@mui/material/Grid";
import { Grid } from "@mui/material";
import { render } from "@testing-library/react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Rover from "../rover/rover";
import { Switch, Route } from "react-router-dom";
import Nav from "../nav";
import { fetchRovers } from "../../actions/fetchRovers";

//class App extends React.Component {
class Home extends React.Component {
  rovers = (props) => {
    return props.map((c) => (
      <Grid item xs={5} columns={12}>
        <Item>
          <RoverCard rover={c} />
        </Item>
      </Grid>
    ));
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="Nav">
          {this.props.test.length > 0 && <Nav rovers={this.props.test} />}
          {/* <Nav rovers={this.state.rovers} /> */}
        </div>

        <Grid container justifyContent="space-evenly" rowSpacing={4}>
          {this.rovers(this.props.test)}
        </Grid>

        <br />
        <br />
      </React.Fragment>
    );
  }
}

// function mDTP(dispatch){
//   return {
//     dispatchFetchRovers: (rovers) => dispatch(fetchRovers(rovers)),

//   }
// }

function mSTP(state) {
  return {
    test: state.rovers,
  };
}

export default connect(mSTP)(Home);
