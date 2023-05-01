import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';


export default function TitlebarImageList(props) {


  var data = props
  if(data.photos.photos){
    data = data.photos.photos
  }else{
    data = data.photos
  }
  
  return (
    <ImageList sx={{ width: '100%', height: '100%' }}>
      {data.map((item) => (
            <ImageListItem key={item.id} name={item.camera.name}>
              <img
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

