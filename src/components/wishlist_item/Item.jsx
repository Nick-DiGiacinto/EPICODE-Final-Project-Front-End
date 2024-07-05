import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import styles from "./item.module.css";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/addCart";

const Item = ({ prodotto, loading, setAcquistato }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart(prodotto));
    setAcquistato(true);
    dispatch({
      type: "DELETE_FROM_WISH",
      payload: prodotto,
    });
  };

  return (
    <div>
      <Row className={`${styles.row}`}>
        <Col>
          {!loading ? (
            <img
              style={{ width: "100%" }}
              src={prodotto?.immagine}
              alt="img"
            ></img>
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <Spinner className="align-self-center" />
            </div>
          )}
        </Col>

        <Col className="text-start flex-column d-flex">
          <p className="fs-5">{prodotto.titolo}</p>
          <span className="fs-6">€ {prodotto.prezzo}</span>
          <div className="d-flex align-items-center justify-content-between">
            <button
              onClick={handleClick}
              className={`${styles.button_buy} rounded`}
              size="sm"
            >
              Acquista
            </button>
            <AiFillDelete
              onClick={() =>
                dispatch({ type: "DELETE_FROM_WISH", payload: prodotto })
              }
              className={`${styles.button_remove}`}
              size="sm"
            />
          </div>
        </Col>
      </Row>
      <hr className={`${styles.hr}`} />
    </div>
  );
};

export default Item;
