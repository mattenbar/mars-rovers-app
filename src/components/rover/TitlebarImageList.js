import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

export default function TitlebarImageList(props) {
  var data = props;
  if (data.photos.photos) {
    data = data.photos.photos;
  } else {
    data = data.photos;
  }

  const onTrigger = (event) => {
    const currentImg = props.photos.filter(
      (photo) =>
        photo.id.toString() === event.target.attributes["id"].value.toString()
    );
    const findIndexHelper = (element) =>
      element.id.toString() === event.target.attributes["id"].value.toString();
    const currentIndex = props.photos.findIndex(findIndexHelper)
    const photos = props.photos;
    props.onOpenModal(currentImg, currentIndex, photos);
  };

  return (
    <ImageList
      
      cols={2}
      gap={8}
      sx={{ width: "100%", height: "100%" }}
    >
      {data.map((item) => (
        <ImageListItem
          key={`${item.camera.name}_${item.id}`}
          id={item.id}
          name={item.camera.name}
          onClick={onTrigger}
        >
          <img
            id={item.id}
          
            src={`${item.img_src}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img_src}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt="img"
            loading="lazy"
          />
          <ImageListItemBar
            title={`Camera: ${item.camera.name}`}
            subtitle={`SOL: ${item.sol}
                ID:${item.id}
            `}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
