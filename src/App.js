import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import { Switch, Route, withRouter } from "react-router-dom";
// import { fetchRovers } from "./actions/fetchRovers";
// import { connect } from "react-redux";
// import Header from "./components/header/Header";
// import ImageModal from "./components/rover/ImageModal";

import Home from "./components/home/home";
// import Rover from "./components/rover/rover";
// import CssBaseline from "@mui/material/CssBaseline";
// import Container from "@mui/material/Container";

import RootLayout from "./pages/Root";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoversData } from "./store/rover-actions";
import Rover from './components/rover/rover'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home/> },
      { path: "/curiosity", element: <Rover /> },
      { path: "/spirit", element: <></> },
      { path: "/opportunity", element: <></> },
      { path: "/perseverance", element: <></> },
    ],
  },
]);



export default function App() {
  const

  handleCloseEvent = () => {
    return this.setState({
      displayModal: false,
    });
  };

  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(fetchRoversData())
  },[dispatch])

  const rovers = useSelector((state) => state.rovers);

  return (
    <>
      {console.log(rovers)}
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

// function handleOpenModal(currentIimg, currentIndex, photos) {
//   return this.setState({
//     displayModal: true,
//     img: currentIimg[0],
//     currentIndex: currentIndex,
//     photos: photos
//   });
// }

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       displayModal: false,
//       img: '',
//       currentIndex: 0,
//       photos: []
//     };
//     this.handleCloseEvent = this.handleCloseEvent.bind(this);
//     this.handleOpenModal = handleOpenModal.bind(this);
//   }



//   render() {
//     // const routes = roverNames.map((c) => (
//     //   <Route
//     //     key={c}
//     //     exact
//     //     path={"/" + c}
//     //     render={() => (
//     //       <Rover
//     //         onOpenModal={this.handleOpenModal.bind(this)}
//     //         roverNames={roverNames}
//     //         rover={c}
//     //       />
//     //     )}
//     //   />
//     // ));

//     return (
//       <RouterProvider router={router}></RouterProvider>
//       // <Container
//       //   maxWidth="lg"
//       //   sx={{ display: "flex", height: "auto", flexWrap: "wrap" }}
//       // >
//       //   {this.state.displayModal && (
//       //     <ImageModal photos={this.state.photos} img={this.state.img} currentIndex={this.state.currentIndex} onClose={this.handleCloseEvent} />
//       //   )}
//       //   <CssBaseline />
//       //   <Header roverNames={roverNames} />
//       //   <Switch>
//       //     <Route key="home" exact path="/" render={() => <Home />} />
//       //     {routes}
//       //   </Switch>
//       // </Container>
//     )
//   }
// }

// function mSTP(state) {
//   return {
//     rovers: state.rovers.rovers,
//   };
// }

// function mDTP(dispatch) {
//   return {
//     dispatchFetchRovers: (rovers) => dispatch(fetchRovers(rovers)),
//   };
// }

// export default withRouter(connect(mSTP, mDTP)(App));
