import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./wish.css";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Item from "../wishlist_item/Item";
import { GiCrossMark } from "react-icons/gi";
import { Link } from "react-router-dom";

function Wish({ show, setShow }) {
  const [showCarrello, setShowCarrello] = useState(false);
  const [acquistato, setAcquistato] = useState(false);
  const [loading, setLoading] = useState(true);
  const wish = useSelector((state) => state?.wishReducer?.wish);
  const id = useSelector((state) => state?.usersReducer?.users?.id);

  useEffect(() => {
    setShowCarrello(show);
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, [show]);

  const handleClose = () => {
    setShowCarrello(false);
    setTimeout(() => {
      setShow(false);
    }, 1000);
  };

  useEffect(() => {
    console.log("acquistato!");
  }, [acquistato]);

  return (
    <Offcanvas
      show={showCarrello}
      onHide={handleClose}
      className="custom-background"
    >
      <Offcanvas.Header>
        <Offcanvas.Title>Wishlist</Offcanvas.Title>
        <GiCrossMark
          onClick={() => {
            handleClose();
          }}
          className="text-light cross"
        />
      </Offcanvas.Header>
      <Offcanvas.Body className="body">
        <h4 className="mb-3">All the games you would like to buy:</h4>
        {wish?.length > 0 && (
          <Container>
            {wish?.length > 0 &&
              wish?.map((p, i) => (
                <Item
                  key={i}
                  prodotto={p}
                  loading={loading}
                  setAcquistato={setAcquistato}
                />
              ))}
          </Container>
        )}{" "}
        {!wish?.length > 0 && !acquistato && (
          <p>Add a game from the store</p>
        )}
        {acquistato && (
          <p>
            Game added to the{" "}
            <Link onClick={() => setShow(false)} to={`/checkout/${id}`}>
              cart
            </Link>
          </p>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Wish;
