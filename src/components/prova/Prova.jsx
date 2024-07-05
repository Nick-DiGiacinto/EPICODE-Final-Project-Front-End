import React, { useEffect, useState } from "react";
import { Alert, Card, Col } from "react-bootstrap";
import styles from "../prova/myStyle.module.css";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { FaStar,FaRegStar } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import addToWish from "../../redux/actions/addWish";
import { addToCart } from "../../redux/actions/addCart";

export const Prova = ({
  videogioco,
  selected,
  setSelected,
  hovered,
  setHovered,
}) => {
  const [addedToWish, setAddedToWish] = useState(false);
  const [isInLibrary, setIsInLibrary] = useState(false);
  const [show, setShow] = useState(false);
  const [like, setLike] = useState(false);
  const [alert, setAlert] = useState(false);
  const [checkWish, setCheckWish] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wish = useSelector((state) => state?.wishReducer?.wish);
  const token = useSelector(
    (state) => state?.authReducer?.bearerToken?.accessToken
  );
  const libreria = useSelector((state) => state?.libraryReducer?.library);
  const cart = useSelector((state) => state?.cartReducer?.cart);
  const id = useSelector((state) => state?.usersReducer?.users?.id);

  const inWish = (videogioco) => {
    const arrayTitoli = wish?.map((v) => v?.titolo);
    if (arrayTitoli.includes(videogioco?.titolo)) {
      return true;
    }
    return false;
  };

  const inCart = (videogioco) => {
    const arrayTitoli = cart?.map((v) => v?.titolo);
    if (arrayTitoli?.includes(videogioco?.titolo)) {
      return true;
    }
    return false;
  };

  const inLibrary = (videogioco) => {
    const arrayTitoli = libreria?.map((v) => v?.titolo);
    if (arrayTitoli?.includes(videogioco?.titolo)) {
      return true;
    } else {
      return false;
    }
  };

  // HANDLE NAVIGATE
  const handleNavigate = () => {
    navigate(`/store/${videogioco?.id}`);
  };

  // HANDLE CARD MOUSE-OVER
  const handleOver = () => {
    if (videogioco?.id !== selected) {
      console.log(videogioco.id);
      setHovered(videogioco?.id);
    }
  };

  // HANDLE Click-DISPATCH-Wish
  const handleClick = () => {
    token ? dispatch(addToWish(videogioco)) : setAlert(true);
    // console.log(videogioco);
    console.log(wish);
  };

  // HANDLE Click-shop
  const handleClickShop = (e) => {
    if (token && !inCart(videogioco)) {
      dispatch(addToCart(videogioco));
      setShow(true);
    } else if (!token) {
      e.preventDefault();
      setAlert(true);
    }
  };

  useEffect(() => {
    if (!inWish(videogioco)) {
      setCheckWish(false);
    }
  }, [wish]);

  useEffect(() => {
    if (inLibrary(videogioco)) {
      setIsInLibrary(true);
    } else {
      setIsInLibrary(false);
    }
  }, [libreria]);

  return (
    <>
      <Col xs={12} md={6} lg={4} xl={3} className="mt-3 px-4">
        <Card
          onMouseEnter={() => handleOver()}
          className={`${styles.body} ${
            hovered === videogioco?.id && styles.body_opacity
          }`}
        >
          <div>
            <Card.Img
              loading="lazy"
              className={`${styles.img}`}
              variant="top"
              src={videogioco?.immagine}
              referrerPolicy="no-referrer"
              onClick={() => handleNavigate()}
            />
          </div>
          <Card.Body className={`${styles.text}`}>
            <div>
              <Card.Title
                className={`${styles.title}`}
                onClick={() => handleNavigate()}
              >
                {videogioco?.titolo}
              </Card.Title>

              <Card.Text>
                <p>
                  {videogioco?.prezzo || "Gratis"}{" "}
                  {videogioco?.prezzo ? "€" : ""}
                </p>
              </Card.Text>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              {!isInLibrary && (
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    onClick={(e) => handleClickShop(e)}
                    className={`${styles.button}`}
                  >
                    <FaShoppingCart
                      className={`${styles.cart}`}
                      style={{ marginRight: "10px" }}
                    />

                    {!inCart(videogioco) ? (
                      <span>Buy now</span>
                    ) : (
                      <span onClick={() => navigate(`/checkout/${id}`)}>
                        In the cart!
                      </span>
                    )}
                  </button>{" "}
                </div>
              )}
              {isInLibrary && (
                <p
                  style={{ textAlign: "center" }}
                  className={`${styles.inLibrary}`}
                >
                  In libreria
                </p>
              )}

              <div style={{ position: "relative" }}>
                {!checkWish && (
                  <FaRegStar
                    className={`${styles.reg_star_icon} `}
                    onClick={() => {
                      setLike(like);
                      if (!inWish(videogioco?.titolo)) {
                        setCheckWish(true);
                        setTimeout(() => {
                          setAddedToWish(true);
                        }, 100);
                      }
                      handleClick();
                    }}
                  />
                )}

                {checkWish && (
                  <FaStar
                    className={`${styles.reg_star_icon} ${
                      addedToWish && styles.reg_star_icon_clicked
                    }  `}
                    onClick={() => {
                      if (inWish(videogioco?.titolo)) {
                        setCheckWish(false);
                        // setTimeout(() => {
                        //   setAddedToWish(true);
                        // }, 500);
                      }
                      setLike(!like);
                      dispatch({
                        type: "DELETE_FROM_WISH",
                        payload: videogioco,
                      });
                    }}
                  />
                )}
              </div>
            </div>
            {alert && !token && (
              <Alert key="danger" variant="danger">
                Non puoi fare acquisti{" "}
                <Link to={"/login"}>se non hai effettato il login!</Link>
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Col>

      {/* {show && (
        <MyPopup titolo={videogioco?.titolo} show={show} setShow={setShow} />
      )} */}
    </>
  );
};
