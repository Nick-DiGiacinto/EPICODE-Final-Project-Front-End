import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from "./singleProduct.module.css";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Chip } from "@mui/material";
import { addToCart } from "../../redux/actions/addCart";
import { useDispatch, useSelector } from "react-redux";

export const SingleProduct = () => {
  const { id } = useParams();
  const [prodotto, setProdotto] = useState();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.cartReducer?.cart);
  const libreria = useSelector((state) => state?.libraryReducer?.library);
  const location = useLocation();

  const recuperaProdotto = async () => {
    try {
      const response = await fetch(`http://localhost:8090/api/auth/vg/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProdotto(data);
        console.log("Singolo prodotto salvato nello stato", prodotto);
      } else {
        console.log("Response NOT ok!");
      }
    } catch (error) {
      console.log("Sono catch", error);
    }
  };

  useEffect(() => {
    recuperaProdotto();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);

  const handleClick = () => {
    console.log("Chip categoria cliccata!");
  };

  const inCart = (prodotto) => {
    const titoli = cart?.map((t) => t.titolo);

    return titoli?.includes(prodotto?.titolo) || false;
  };

  const inLibrary = () => {
    const titoli = libreria?.map((t) => t.titolo);

    return titoli?.includes(prodotto?.titolo) || false;
  };

  return (
    <>
      <div
        style={{
          opacity: 0.1,
          width: "100vw",
          minHeight: "100%",
          position: "absolute",
          backgroundImage: `url(${prodotto?.immagine})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <Container className={`${styles.body}`}>
        <Row>
          <h1 style={{ marginTop: "110px" }} className={`${styles.text}`}>
            {prodotto?.titolo}
          </h1>
          <div className={`${styles.img_container}`}>
            <Image
              fluid={true}
              src={`${prodotto?.immagine}`}
              className={`${styles.img}`}
            ></Image>

            <div className={`${styles.text} `}>
              <hr />
              <Row className={`${styles.bottom}`}>
                <Col xs={12} lg={6}>
                  <Chip
                    label={prodotto?.categoria}
                    variant="outlined"
                    onClick={handleClick}
                    style={{ marginTop: "1rem", marginBottom: "2rem" }}
                  />
                  <p>
                    <span
                      style={{ fontSize: "0.7rem" }}
                      className="text-warning"
                    >
                      PUBLISHER:
                    </span>{" "}
                    {prodotto?.editore}
                  </p>
                  <p>
                    <span
                      style={{ fontSize: "0.7rem" }}
                      className="text-warning"
                    >
                      DEVELOPER:
                    </span>{" "}
                    {prodotto?.casaProduzione}
                  </p>
                  <p>
                    <span
                      style={{ fontSize: "0.7rem" }}
                      className="text-warning"
                    >
                      RELEASE DATE:
                    </span>{" "}
                    {prodotto?.dataPubblicazione}
                  </p>
                </Col>
                <Col xs={12} lg={6}>
                  <p>{prodotto?.descrizione}</p>

                  <p>
                    {!inCart(prodotto) && !inLibrary(prodotto) && (
                      <button
                        onClick={() => dispatch(addToCart(prodotto))}
                        className={`${styles.button}`}
                      >
                        <span>€ {prodotto?.prezzo} - </span>
                        Buy
                      </button>
                    )}
                    {inCart(prodotto) && !inLibrary(prodotto) && (
                      <div className={`${styles.inCart}`}>
                        <p>In the cart</p>
                      </div>
                    )}
                  </p>
                  {inLibrary(prodotto) && (
                    <div className={`${styles.inLibrary}`}>
                      <p>In your collection</p>
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
};
