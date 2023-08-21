import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import { useDispatch } from "react-redux";
import { fetchRoversData } from "./store/rover-actions";
// import Rover, {action as roverAction} from "./components/rover/rover";
import Home, { roversLoader } from "./components/home/home";
import RoverPage, {action as roverAction} from "./pages/roverPage";


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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout closeModal={handleCloseEvent} modal={modal} />,
      id: "root",
      loader: roversLoader,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          id:"rover",
          path: "/rover/:roverName",
          element: <RoverPage onOpenModal={handleOpenModal.bind(this)} />,
          
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
