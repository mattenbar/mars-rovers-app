import Modal from "../UI/Modal"

const ImageModal = (props) => {
    return (
        <Modal onClose={props.onClose}>
            {console.log(props.onClose)}
          <div >
            <img width='100%' height='auto' src={props.imgSrc}></img>
            <button onClick={props.onClose}>
              close
            </button>
          </div>
        </Modal>
      );

}

export default ImageModal
