import * as React from "react";
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
    // Call the parent callback function
    props.onOpenModal(event);
  };

  return (
    <ImageList
      variant="masonry"
      cols={2}
      gap={8}
      sx={{ width: "100%", height: "100%" }}
    >
      {data.map((item) => (
        <ImageListItem
          key={`${item.camera.name}_${item.id}`}
          name={item.camera.name}
          onClick={onTrigger}
        >
          <img
            orignalSrc={item.img_src}
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
