import React, {useState} from'react'
import Modal from "../UI/Modal";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import CloseIcon from '@mui/icons-material/Close';

const ImageModal = (props) => {

  const [currentImg, setCurrentImg] = useState(props.img)
  const [currentIndex, setCurrentIndex] = useState(props.currentIndex)
  console.log("img modal props", props);
  
  return (
    <Modal onClose={props.onClose}>
      {/* {console.log(props.img.target['__reactProps$qm4km4ggqg'].orignalSrc)} */}
      <div style={{ height: 'auto', margin:'auto'}}>
        <ImageListItem
          key={`${currentImg.camera.name}_${props.img.id}`}
          id={currentImg.id}
          name={currentImg.camera.name}
        >
          <CloseIcon id='close-btn'  sx={{float:'right', marginBottom:'10px'}} onClick={props.onClose} />
          <img
            id={currentImg.id}
            orignalSrc={currentImg.img_src}
            src={`${currentImg.img_src}?w=248&fit=crop&auto=format`}
            srcSet={`${currentImg.img_src}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt="img"
            loading="lazy"
          />
          <ImageListItemBar
            title={`Camera: ${currentImg.camera.name}`}
            subtitle={`SOL: ${currentImg.sol}
                ID:${currentImg.id} 
            `}
          ></ImageListItemBar>
        </ImageListItem>
      </div>
    </Modal>
  );
};

export default ImageModal;
