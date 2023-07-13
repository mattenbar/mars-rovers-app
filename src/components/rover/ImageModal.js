import React, { useState } from "react";
import Modal from "../UI/Modal";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import CloseIcon from "@mui/icons-material/Close";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const ImageModal = (props) => {
  const [currentImg, setCurrentImg] = useState(props.img);
  const [currentIndex, setCurrentIndex] = useState(props.currentIndex);


  const handleChange = (event, value) => {
    setCurrentIndex(value - 1);
    setCurrentImg(props.photos[value - 1]);
  };

  return (
    <Modal onClose={props.onClose}>
      <CloseIcon id="close-btn" sx={{}} onClick={props.onClose} />

      <ImageListItem
        key={`${currentImg.camera.name}_${props.img.id}`}
        id={currentImg.id}
        name={currentImg.camera.name}
        sx={{ width: "auto" }}
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
        position: "inherit !important"}}
        title={
          <Stack
            sx={{
              padding: "5px",
              alignItems: "center",
            }}
            spacing={2}
          >
            <Pagination
              defaultPage={currentIndex + 1}
              onChange={handleChange}
              count={props.photos.length}
            />
          </Stack>
        }
      ></ImageListItemBar>
    </Modal>
  );
};

export default ImageModal;
