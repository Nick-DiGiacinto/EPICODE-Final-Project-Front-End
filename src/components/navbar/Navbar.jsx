import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Dropdown, Image } from "react-bootstrap";
import styles from "./navbar.module.css";
import LoginModal from "../login/LoginModal";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/logout";
import { useNavigate } from "react-router-dom";
import Wish from "../offcanvas_wish/Wish";
import getUsers from "../../redux/actions/getUsers";
import { recuperaLibreria } from "../../redux/actions/addLibrary";
import logoNextVerseHD from "../localImages/Logo NextVerseGames FullHD.jpeg";

const MyNavbar = () => {
  // HOOKS
  const [modale, setModale] = useState(false);
  const [showCarrello, setShowCarrello] = useState(false);
  const [cartCounter, setCartCounter] = useState(false);
  const handleShow = () => setShowCarrello(true);
  const handleClose = () => setShowCarrello(false);
  const [out, setOut] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(
    (state) => state?.authReducer?.bearerToken?.accessToken
  );
  const username = useSelector(
    (state) => state?.authReducer?.bearerToken?.username
  );
  const users = useSelector((state) => state?.usersReducer?.users);
  const cart = useSelector((state) => state?.cartReducer?.cart);

  const handleLogout = () => {
    dispatch({
      type: "CLEAN_LIBRARY",
    });
    dispatch({
      type: "CLEAN_CART",
    });
    dispatch({
      type: "LOGOUT_USER",
    });
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        dispatch(getUsers(username, token));
      }, 100);
    }
  }, [token]);

  useEffect(() => {
    setCartCounter(true);
    setTimeout(() => {
      setCartCounter(false);
    }, 1000);
  }, [cart?.length]);

  return (
    <>
      <div
        className={`${styles.navContainer}`}
        style={{ position: "relative" }}
      >
        {showCarrello && (
          <Wish
            show={showCarrello}
            setShow={setShowCarrello}
            onHide={handleClose}
          />
        )}
        {modale && (
          <div
            className={`${styles.overlay}`}
            onClick={() => setModale(false)}
          ></div>
        )}
        <Navbar
          fixed="top"
          variant="dark"
          expand="lg"
          className={`${styles.mainNav} `}
        >
          <Container>
            <Navbar.Brand
              className={`${styles.navLink} ${styles.brand}`}
              onClick={() => navigate("/")}
            >
            <Image style={{ height: "50px", weight: "50px" }} src={logoNextVerseHD}
            ></Image>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="justify-content-between w-100">
                <div className="d-flex">
                  {token && (
                    <Nav.Item>
                      <Nav.Link>
                        <div className={`${styles.cartContainer}`}>
                          <FaShoppingCart
                            className={`${styles.cart}`}
                            onClick={() => navigate(`/checkout/${users.id}`)}
                          />
                          <span
                            className={`${styles.cartCounter} ${
                              cartCounter && styles.cartUpdated
                            }`}
                          >
                            {cart?.length}
                          </span>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                  )}
                  <Nav.Item>
                    {!token ? (
                      <Nav.Link
                        href="#"
                        onClick={() => setModale(true)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                        eventKey="link-3"
                      >
                        <FaUser
                          style={{ marginRight: "10px", color: "whitesmoke" }}
                        />
                        <span className={`${styles.navLink} `}>LOG IN</span>
                      </Nav.Link>
                    ) : (
                      <Dropdown className={`${styles.down}`}>
                        <Dropdown.Toggle
                          id="dropdown-button-dark-example1"
                          variant="none"
                          className="text-light"
                        >
                          Welcome {users?.username}
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
                          <Dropdown.Item onClick={() => navigate("/profile")}>
                            Profilo
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#/action-2"
                            onClick={() => handleShow()}
                          >
                            Wishlist
                          </Dropdown.Item>

                          <Dropdown.Divider />
                          <Dropdown.Item
                            href="#/action-4"
                            onMouseOver={() => setOut(true)}
                            onMouseLeave={() => setOut(false)}
                            onClick={handleLogout}
                          >
                            <AiOutlineDoubleLeft
                              className={`${styles.out} ${
                                out && styles.outHover
                              }`}
                            />
                            Logout
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </Nav.Item>
                </div>
                <div className="d-flex flex-column flex-lg-row mt-4 mt-lg-0">
                  <Nav.Link
                    className={`${styles.navLink}`}
                    onClick={() => navigate("/store")}
                  >
                    STORE
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => handleShow()}
                    className={`${styles.navLink}`}
                  >
                    WISHLIST
                  </Nav.Link>
                  {token && (
                    <Nav.Link
                      onClick={() => navigate(`/library/${users.id}`)}
                      className={`${styles.navLink}`}
                    >
                      COLLECTION
                    </Nav.Link>
                  )}
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {modale && <LoginModal setModale={setModale} />}
      </div>
    </>
  );
};

export default MyNavbar;
