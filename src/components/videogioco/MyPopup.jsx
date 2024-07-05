import { Modal } from "react-bootstrap";
import "./popup.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function MyPopup({ show, setShow, titolo }) {
  // const cart = useSelector((state) => state?.cartReducer?.cart);
  const [away, setAway] = useState(false);

  // const handleShow = () => setShow(true);
  useEffect(() => {
    console.log(titolo);
    setTimeout(() => {
      setAway(true);
    }, 2000);
  }, []);

  return (
    <>
      {!away && (
        <Modal style={{ backdropFilter: "blur(2px)" }} show={show}>
          <Modal.Body className="body">
            <h4>{titolo} added to the cart</h4>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default MyPopup;
