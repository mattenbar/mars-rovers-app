import React, { useState, useRef } from "react";
import Modal from "../UI/Modal";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import CloseIcon from "@mui/icons-material/Close";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useKeyPressEvent } from "react-use";

const ImageModal = (props) => {
  const [currentImg, setCurrentImg] = useState(props.img);
  const currentIndex = useRef(props.currentIndex);

  const handleChange = (event, value) => {
    setCurrentImg(props.photos[value - 1]);
    currentIndex.current = value - 1;
  };

  const handleArrow = (event) => {
    if (
      event.key === "ArrowRight" &&
      currentIndex.current < props.photos.length - 1
    ) {
      currentIndex.current++;
      setCurrentImg(props.photos[currentIndex.current]);
    } else if (event.key === "ArrowLeft" && currentIndex.current > 0) {
      currentIndex.current--;
      setCurrentImg(props.photos[currentIndex.current]);
    }
  };

  useKeyPressEvent("Escape", props.onClose);
  useKeyPressEvent("ArrowRight", handleArrow);
  useKeyPressEvent("ArrowLeft", handleArrow);

  return (
    <Modal onClose={props.onClose}>
      <CloseIcon
        sx={{ alignSelf: "end" }}
        id="close-btn"
        onClick={props.onClose}
      />
      {console.log(currentImg)}
      <ImageListItem
        key={`${currentImg.camera.name}_${props.img.id}`}
        id={currentImg.id}
        name={currentImg.camera.name}
        sx={{
          width: "100% !important",
          height: "auto",
          maxHeight: "88% ",
          maxWidth: "fit-content !important ",
          alignSelf: "center !important ",
        }}
      >
        <img
          id={currentImg.id}
          src={`${currentImg.img_src}?w=248&fit=crop&auto=format`}
          srcSet={`${currentImg.img_src}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt="img"
          loading="lazy"
        />
        <ImageListItemBar
          sx={{ position: "absolute !important" }}
          title={`CAMERA: ${currentImg.camera.name}`}
          subtitle={`SOL: ${currentImg.sol} ID: ${currentImg.id}`}
        ></ImageListItemBar>
      </ImageListItem>

      <ImageListItemBar
        sx={{
          position: "inherit !important",
          backgroundColor: "black",
        }}
        title={
          <Stack
            sx={{
              padding: "5px",
              alignItems: "center",
              backgroundColor: "black",
            }}
            spacing={2}
          >
            <Pagination
              defaultPage={currentIndex.current + 1}
              page={currentIndex.current + 1}
              onChange={handleChange}
              count={props.photos.length}
              sx={{ backgroundColor: "black" }}
            />
          </Stack>
        }
      ></ImageListItemBar>
    </Modal>
  );
};

export default ImageModal;
