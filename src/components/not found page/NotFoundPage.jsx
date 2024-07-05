import React from "react";
import styles from "./notfound.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className={`${styles.body}`}>
      <Container>
        <Row>
          <Col>
            <h1 className="mt-4">ERRORE 404</h1>
            <h3>Pagina non trovata! 🙁</h3>
            <h6 className="mt-5">
              La pagina che hai cercato non esiste o non è disponibile. Da qui
              puoi{" "}
              <span className="text-primary " onClick={() => navigate("/")}>
                tornare alla home{" "}
              </span>
              oppure andare{" "}
              <span className="text-primary" onClick={() => navigate("/store")}>
                al negozio
              </span>
            </h6>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFoundPage;
