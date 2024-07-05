import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authRequest } from "../../redux/actions/authRequest";
import styles from "./login.module.css";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginModal = (props) => {
  const [formUsernameValue, setFormUserValue] = useState("");
  const [formPswValue, setformPswValue] = useState("");
  const [stato, setStato] = useState([]);
  const [token, setToken] = useState(null);
  const tokenList = useSelector((state) => state?.authReducer?.bearerToken);
  const failedLogin = useSelector((state) => state?.failedLogin?.failedLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (tokenList) props.setModale(false);
  }, [tokenList]);

  return (
    <div
      className={`${styles.login} d-flex justify-content-center align-items-center flex-column`}
    >
      {!token && (
        <>
          <Form>
            <h2>Log In</h2>
            <Form.Group
              className="mb-3 d-flex justify-content-center"
              controlId="formBasicUsername"
            >
              <Form.Control
                className={`${styles.control}`}
                style={{
                  backgroundColor: "White",
                  width: "500px",
                  color: "black",
                }}
                value={formUsernameValue}
                type="username"
                placeholder="Username"
                onChange={(e) => {
                  // console.log(formEmailValue);
                  setFormUserValue(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex justify-content-center"
              controlId="formBasicPassword"
            >
              <Form.Control
                className={`${styles.control}`}
                style={{ backgroundColor: "White", color: "black" }}
                value={formPswValue}
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setformPswValue(e.target.value);
                }}
              />
            </Form.Group>
            <div className="w-100 d-flex flex-column justify-content-center align-items-center">
              <Button
                className={`${styles.login_button}`}
                variant="success"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (formUsernameValue.length > 2 || formPswValue.length > 2) {
                    console.log(formUsernameValue);
                    dispatch(
                      authRequest(
                        formUsernameValue,
                        formPswValue,
                        setStato,
                        setToken
                      )
                    );
                    console.log("tokenList", tokenList);
                    setFormUserValue("");
                    setformPswValue("");
                    // props.setModale(false);
                  } else {
                    console.log("errore login");
                  }
                }}
              >
                Enter
              </Button>
            </div>
            <div className="w-100 text-center">
              <span className={`${styles.frase}`}>OR CONNECT WITH</span>
            </div>
            <div className={`${styles.login_icons}`}>
              <FaGoogle />
              <FaFacebook />
              <FaApple />
            </div>
            {!tokenList && !failedLogin && (
              <div style={{ color: "white", marginTop: "2rem" }}>
                You don't have an account?{" "}
                <span onClick={() => props.setModale(false)}>
                  <Link to={"/register"}>Sign up now</Link>
                </span>
              </div>
            )}
            {failedLogin && (
              <div style={{ color: "red", marginTop: "2rem" }}>
                Utente non trovato!{" "}
                <span onClick={() => props.setModale(false)}>
                  <Link to={"/register"}>
                    Vuoi effettuare la registrazione?
                  </Link>
                </span>
              </div>
            )}

            {/* <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                console.log(stato);
              }}
            >
              Stato
            </Button> */}
          </Form>
        </>
      )}
    </div>
  );
};

export default LoginModal;
