import React, { useState } from "react";
import styles from "./profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Form, Row } from "react-bootstrap";
import getUsers from "../../redux/actions/getUsers";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const token = useSelector(
    (state) => state?.authReducer?.bearerToken?.accessToken
  );
  const user = useSelector((state) => state?.usersReducer?.users);
  const [showModale, setShowModale] = useState(false);
  const [editedName, setEditedName] = useState(null);
  const [editedUsername, setEditedUsername] = useState(null);
  const [editedEmail, setEditedEmail] = useState(null);

  // PUT

  // const editUser = () => {
  //   return async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:8090/api/auth/checkout/edit/${user?.id}`,
  //         {
  //           method: "PUT",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             name: editedName || user?.name,
  //             username: editedUsername || user?.username,
  //             email: editedEmail || user?.email,
  //           }),
  //         }
  //       );

  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log("Utente modificato", data);
  //         dispatch({
  //           type: "GET_USER",
  //           payload: data,
  //         });
  //       } else {
  //         console.log("Response not ok");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  // };

  // SUBMIT

  const handleSubmit = (e) => {
    e.preventDefault();
    // const sendPut = editUser();
    // sendPut();
    // console.log("submit fatto per l'utente con id: ", user?.id);
  };

  return (
    <div className={`${styles.body}`}>
      <Container>
        <Row className="justify-content-center flex-column">
          <h2 className="text-center mb-3">Profile Page</h2>
          <Col>
            <h5 className="mb-5">User personal data</h5>
          </Col>
          <Col>
            <p>NAME: {user?.name}</p>
          </Col>
          <Col>
            <p>USERNAME: {user?.username}</p>
          </Col>
          <Col>
            <p>E-MAIL: {user?.email}</p>
          </Col>
        </Row>
        {/* <Row>
          <Col>
            <button
              onClick={() => setShowModale(!showModale)}
              className={`${styles.button}`}
            >
              Modifica
            </button>
          </Col>
        </Row>
        {showModale && (
          <Row className="mt-5">
            <Col xs={12} md={6}>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    onChange={(e) => setEditedName(e.target.value)}
                    type="name"
                    placeholder={user?.name}
                  />
                  <Form.Text className="text-muted">
                    Modifica il tuo nome
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    onChange={(e) => setEditedUsername(e.target.value)}
                    type="username"
                    placeholder={user?.username}
                  />
                  <Form.Text className="text-muted">
                    Modifica il tuo username
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    onChange={(e) => setEditedEmail(e.target.value)}
                    type="email"
                    placeholder={user?.email}
                  />
                  <Form.Text className="text-muted">
                    Modifica la tua e-mail
                  </Form.Text>
                </Form.Group>
                <button
                  onClick={(e) => {
                    handleSubmit(e);
                    console.log(editedName, editedUsername, editedEmail);
                  }}
                  className={`${styles.button}`}
                >
                  Invia
                </button>
              </Form>
            </Col>{" "}
          </Row>
        )} */}
      </Container>
    </div>
  );
};

export default ProfilePage;
