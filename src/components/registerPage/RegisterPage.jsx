import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  // HOOKS
  const [formUsernameValue, setFormUserValue] = useState("");
  const [formPswValue, setformPswValue] = useState("");
  const [formEmailValue, setformEmailValue] = useState("");
  const [formNameValue, setformNameValue] = useState("");
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [validated, setValidated] = useState(false);
  const tokenList = useSelector((state) => state?.authReducer?.bearerToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);

  //useEffect(() => console.log(formEmailValue), [formEmailValue]);

  // OGGETTO UTENTE DA PASSARE COME BODY DELLA REQUEST
  const user = {
    name: formNameValue,
    username: formUsernameValue,
    email: formEmailValue,
    password: formPswValue,
  };

  // HTTP REQUEST PER REGISTRARE UN UTENTE
  const registerRequest = async () => {
    try {
      const response = await fetch("http://localhost:8090/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        console.log("Utente registrato");
        setSuccess(true);
      } else if (response.status === 400) {
        console.log("Utente già registrato");
        setFailed(true);
        //setValidated(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // CONTROLLO SUI CAMPI DEL FORM AL SUBMIT
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      registerRequest();
      dispatch({
        type: "NOT_FOUND",
        payload: false,
      });
    }
    setValidated(true);
    event.target.reset();
  };

  useEffect(() => {
    if (login) {
      navigate("/login");
    }
  }, [login]);

  return (
    <>
      {tokenList && navigate("/")}
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundImage:
            "url(https://drive.google.com/u/0/uc?id=1Tz0NKxyiDPvLFSekBXLXcun9IGcIdft2)",
          backgroundSize: "cover",
        }}
      >
        <div className={`${styles.login}`}>
          {
            <>
              <h2 className="mb-4">Registrati ora</h2>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Control
                    required
                    style={{ backgroundColor: "#2E2E34", color: "white" }}
                    value={formNameValue}
                    type="text"
                    placeholder="Nome"
                    onChange={(e) => {
                      setformNameValue(e.target.value);
                    }}
                    isInvalid={validated && !formNameValue}
                  />
                  <Form.Control.Feedback type="invalid">
                    Inserisci il tuo nome
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Control
                    className={`${failed && styles.error} ${
                      success && styles.success
                    }`}
                    required
                    style={{
                      backgroundColor: "#2E2E34",
                      width: "500px",
                      color: "white",
                    }}
                    value={formUsernameValue}
                    type="username"
                    placeholder="Username"
                    onChange={(e) => {
                      // console.log(formEmailValue);
                      setFormUserValue(e.target.value);
                    }}
                    isInvalid={validated && !formUsernameValue}
                  />
                  {!failed && !success && (
                    <Form.Control.Feedback type="invalid">
                      Inserisci il tuo username
                    </Form.Control.Feedback>
                  )}
                  {failed && !success && (
                    <Form.Control.Feedback
                      type="error"
                      style={{ color: "red" }}
                    >
                      Username già esistente!
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Control
                    required
                    className={`${failed && styles.error} ${
                      success && styles.success
                    }`}
                    style={{ backgroundColor: "#2E2E34", color: "white" }}
                    value={formEmailValue}
                    type="email"
                    placeholder="Email"
                    onChange={(e) => {
                      setformEmailValue(e.target.value);
                    }}
                    isInvalid={validated && !formEmailValue}
                  />
                  {!failed && !success && (
                    <Form.Control.Feedback type="invalid">
                      Inserisci la tua mail
                    </Form.Control.Feedback>
                  )}
                  {failed && !success && (
                    <Form.Control.Feedback
                      type="error"
                      style={{ color: "red" }}
                    >
                      Email già esistente!
                    </Form.Control.Feedback>
                  )}
                  {/* {failed && !success && validated && (
                <p style={{ color: "red", marginTop: "1rem", marginBottom: 0 }}>
                  Email già presente nel database ⚠️
                </p>
              )} */}
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Control
                    required
                    style={{ backgroundColor: "#2E2E34", color: "white" }}
                    value={formPswValue}
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setformPswValue(e.target.value);
                    }}
                    isInvalid={validated && !formPswValue}
                  />
                  <Form.Control.Feedback type="invalid">
                    Inserisci una password
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="w-100 d-flex flex-column justify-content-center">
                  {!success && (
                    <Button
                      className={`${styles.login_button}`}
                      variant="primary"
                      type="submit"
                    >
                      Registrati
                    </Button>
                  )}
                  {success && (
                    <p
                      style={{
                        color: "green",
                        marginTop: "1rem",
                        marginBottom: 0,
                      }}
                    >
                      Registrazione avvenuta con successo!{" "}
                      <p
                        style={{ textDecoration: "underline" }}
                        className=" text-light"
                        onClick={() => setLogin(true)}
                      >
                        Clicca qui per cominciare
                      </p>
                    </p>
                  )}
                  {/* {failed && !success && (
                <p style={{ color: "red", marginTop: "1rem", marginBottom: 0 }}>
                  Utente già presente nel database
                </p>
              )} */}
                </div>
              </Form>
            </>
          }
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
