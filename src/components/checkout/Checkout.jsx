import React, { useEffect, useState } from "react";
import styles from "./checkout.module.css";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Item } from "./Item";
import { AiFillDelete } from "react-icons/ai";
import { cleanCart } from "../../redux/actions/cleanCart";
import { Link, useParams } from "react-router-dom";
import { recuperaLibreria } from "../../redux/actions/addLibrary";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ShopTwo } from "@mui/icons-material";
import PayPal from "./PayPal";

export const Checkout = () => {
  const [showForm, setShowForm] = useState(false);
  const [giftUser, setGiftUser] = useState("");
  const [showPayPal, setShowPayPal] = useState(false);
  const [showPayPalGift, setShowPayPalGift] = useState(false);
  const [failedGift, setFailedGift] = useState(false);
  const [invalidNumber, setInvalidNumber] = useState(false);
  const [bought, setBought] = useState(false);
  const [gifted, setGifted] = useState(false);
  const cart = useSelector((state) => state?.cartReducer?.cart);
  const token = useSelector(
    (state) => state?.authReducer?.bearerToken?.accessToken
  );
  const username = useSelector((state) => state?.usersReducer?.users?.username);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(recuperaLibreria(id, token));
  }, [cart]);

  return (
    <Container className={`${styles.body}`}>
      <Row className="text-center">
        <h1 className="mb-3">Your cart</h1>
      </Row>
      <Row className="flex-column">
        <h2 className="mb-3">Checkout</h2>
        {cart && cart.length > 0 && (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th className="text-center">Title</th>
                <th className="text-center">Price</th>
                <th className="text-center">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart &&
                cart.length > 0 &&
                cart.map((prodotto) => <Item prodotto={prodotto} />)}
            </tbody>
          </Table>
        )}
        {!cart.length && !bought && (
          <div>
            <p>You don't have anything in your cart yet</p>
            <span style={{ fontSize: "larger" }}>
              <Link to={"/store"}>Visit our store</Link>
            </span>
          </div>
        )}
        {bought && (
          <p className={`${styles.bought}`}>
            Fatto! <span>Troverai i tuoi acquisti in libreria 👌</span>
          </p>
        )}
        {gifted && !failedGift && (
          <p className={`${styles.bought}`}>
            Regalo inviato!{" "}
            <span>{giftUser} lo troverà nella sua libreria 👌</span>
          </p>
        )}
        {failedGift && cart.length !== 0 && (
          <p style={{ color: "red" }}>
            Impossibile inviare il regalo a {giftUser} perché{" "}
            {cart?.map((prodotto) => prodotto.titolo)} è già presente nella sua
            libreria.
          </p>
        )}
        <Col className="d-flex justify-content-between align-items-center">
          {cart.length > 0 && (
            <button
              onClick={() => {
                setShowPayPal(true);
                // addToLibrary();
                // setBought(true);
              }}
              className={`${styles.button}`}
            >
              Buy for you
            </button>
          )}
          {cart.length > 0 && (
            <button
              onClick={() => {
                if (cart?.length > 1) {
                  setInvalidNumber(true);
                  setTimeout(() => {
                    setInvalidNumber(false);
                  }, 2500);

                  console.log("AIUTO");
                } else {
                  setShowForm(!showForm);
                  setShowPayPal(false);
                }
              }}
              className={`${styles.button}`}
            >
              Make a gift 🎁
            </button>
          )}
          {cart.length > 0 && (
            <p className={`${styles.total}`}>
              Totale:{" "}
              {cart &&
                cart.length > 0 &&
                cart.reduce(
                  (acc, element) => acc + parseInt(element.prezzo),
                  0
                )}{" "}
              €
            </p>
          )}
        </Col>
        <Col className="d-flex align-items-center mt-4">
          {cart.length > 0 && (
            <>
              <AiFillDelete
                onClick={() => dispatch(cleanCart())}
                className={`${styles.button_remove} m-0`}
              />{" "}
              <p className="m-0 ms-3">Svuota carrello</p>
            </>
          )}
        </Col>
        <Row>
          <Col xs={12} md={6}>
            {showForm && !failedGift && (
              <div className={`${styles.giftForm}`}>
                <Form className="mt-5 ">
                  <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Control
                      onChange={(e) => {
                        setGiftUser(e.target.value);
                        console.log(giftUser);
                      }}
                      value={giftUser}
                      type="username"
                      placeholder="Enter username"
                    />
                    <Form.Text className="text-muted">
                      Inserisci il nome dell'utente a cui inviare il regalo.
                    </Form.Text>
                  </Form.Group>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      // sendGift();
                      setShowPayPalGift(!showPayPalGift);
                    }}
                    className={`${styles.button}`}
                    type="submit"
                  >
                    Continue on PayPal...
                  </button>
                </Form>
              </div>
            )}
          </Col>
          <Col>
            {showPayPal && cart.length > 0 && (
              <div className={`${styles.paypalContainer}`}>
                <div>
                  <PayPal
                    token={token}
                    cart={cart}
                    setBought={setBought}
                    username={username}
                    giftUser={giftUser}
                    id={id}
                    action={"buy"}
                  />
                </div>
              </div>
            )}
            {showPayPalGift && cart.length > 0 && (
              <div className={`${styles.paypalContainer}`}>
                <div>
                  <PayPal
                    token={token}
                    cart={cart}
                    setFailedGift={setFailedGift}
                    setGifted={setGifted}
                    setBought={setBought}
                    username={username}
                    giftUser={giftUser}
                    id={id}
                    action={"gift"}
                  />
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Row>
      {invalidNumber && (
        <Alert className="mt-4" variant="danger">
          Puoi inviare soltanto 1 gioco alla volta!
        </Alert>
      )}
    </Container>
  );
};
