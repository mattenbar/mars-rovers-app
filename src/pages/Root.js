import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import ImageModal from "../components/rover/ImageModal";

export default function RootLayout(props) {
  const modal = props.modal
  return (
    <>
      <Header />
      <main >
      {modal.displayModal &&
        <ImageModal
            photos={modal.photos}
            img={modal.img}
            currentIndex={modal.currentIndex}
            onClose={props.closeModal}
          />}
        <Outlet />
      </main>
    </>
  );
}
