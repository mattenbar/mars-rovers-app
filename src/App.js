import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/home";
import RootLayout from "./pages/Root";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoversData } from "./store/rover-actions";
import Rover from "./components/rover/rover";

const initialState = {
  displayModal: false,
  img: "",
  currentIndex: 0,
  photos: [],
};

export default function App() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(initialState);

  const handleOpenModal = (currentIimg, currentIndex, photos) => {
    console.log(currentIimg, currentIndex, photos);
    return setModal({
      displayModal: true,
      img: currentIimg[0],
      currentIndex: currentIndex,
      photos: photos,
    });
  };

  const handleCloseEvent = () => {
    return setModal(initialState);
  };

  useEffect(() => {
    dispatch(fetchRoversData());
  }, [dispatch]);

  const rovers = useSelector((state) => state.rovers);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout closeModal={handleCloseEvent} modal={modal} />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/curiosity",
          element: (
            <Rover
              roverName="Curiosity"
              
              onOpenModal={handleOpenModal.bind(this)}
            />
          ),
        },
        {
          path: "/spirit",
          element: (
            <Rover
              roverName="Spirit"
              
              onOpenModal={handleOpenModal.bind(this)}
            />
          ),
        },
        {
          path: "/opportunity",
          element: (
            <Rover
              roverName="Opportunity"
              
              onOpenModal={handleOpenModal.bind(this)}
            />
          ),
        },
        {
          path: "/perseverance",
          element: (
            <Rover
              roverName="Perseverance"
          
              onOpenModal={handleOpenModal.bind(this)}
            />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

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
