import Modal from "../UI/Modal";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import CloseIcon from '@mui/icons-material/Close';

const ImageModal = (props) => {
  console.log("img modal", props.img);
  // const url = props.img.attributes[0].value
  return (
    <Modal onClose={props.onClose}>
      {/* {console.log(props.img.target['__reactProps$qm4km4ggqg'].orignalSrc)} */}
      <div style={{ height: 'auto', margin:'auto'}}>
        <ImageListItem
          key={`${props.img.camera.name}_${props.img.id}`}
          id={props.img.id}
          name={props.img.camera.name}
        >
          <CloseIcon id='close-btn'  sx={{float:'right', marginBottom:'10px'}} onClick={props.onClose} />
          <img
            id={props.img.id}
            orignalSrc={props.img.img_src}
            src={`${props.img.img_src}?w=248&fit=crop&auto=format`}
            srcSet={`${props.img.img_src}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt="img"
            loading="lazy"
          />
          <ImageListItemBar
            title={`Camera: ${props.img.camera.name}`}
            subtitle={`SOL: ${props.img.sol}
                ID:${props.img.id} 
            `}
          ></ImageListItemBar>
        </ImageListItem>
      </div>
    </Modal>
  );
};

export default ImageModal;
