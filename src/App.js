import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import { useDispatch } from "react-redux";
import Rover from "./components/rover/rover";
import Home, {roversLoader} from './components/home/home'

const initialState = {
  displayModal: false,
  img: "",
  currentIndex: 0,
  photos: [],
};

export default function App() {
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

 

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout closeModal={handleCloseEvent} modal={modal} />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: roversLoader
        },
        {
          path: "/rover/:name",
          element: <Rover onOpenModal={handleOpenModal.bind(this)} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
