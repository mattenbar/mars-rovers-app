import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/home";
import RootLayout from "./pages/Root";
import { useDispatch} from "react-redux";
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
      children: [
        { index: true, element: <Home /> },
        {
          path: "/rover/:name",
          element: (
            <Rover
              roverName="Perseverance"
          
              onOpenModal={handleOpenModal.bind(this)}
            />
          ),
        }
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
