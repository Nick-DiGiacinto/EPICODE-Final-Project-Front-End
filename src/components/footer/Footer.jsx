import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { FaApple, FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import styles from "./footer.module.css";
import logoNextVerseHD from "../localImages/Logo NextVerseGames FullHD.jpeg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className={`${styles.container}`}>
      <Container className="d-flex flex-column justify-content-between flex-md-row">
        <Row className="flex-column align-self-start">
          <Col className="justify-content-center mt-3">
            <Image style={{ height: "100px", weight: "100px" }} src={logoNextVerseHD}
            ></Image>
          </Col>
          <Col className="d-flex justify-content-between mt-2">
            <FaGoogle className="m-2 fs-5" />
            <FaTwitter className="m-2 fs-5" />
            <FaApple className="m-2 fs-5" />
            <FaFacebook className="m-2 fs-5" />
          </Col>
        </Row>
        <Row className="flex-column justify-content-start text-start">
          <Col className={`${styles.child} mt-2`}>Impieghi</Col>
          <Col className={`${styles.child} mt-2`}>La società</Col>
          <Col className={`${styles.child} mt-2`}>Assistenza</Col>
          <Col className={`${styles.child} mt-2`}>Contattaci</Col>
          <Col className={`${styles.child} mt-2`}>Stampa</Col>
          <Col className="d-none d-lg-block mt-2">Mappa del sito</Col>
        </Row>

        <div className={`${styles.small}`}>
          <Row className="flex-column mt-2 text-start">
            <Col className={`${styles.child}`}>Privacy</Col>
            <Col className={`${styles.child}`}>Documentation</Col>
            <Col className={`${styles.child}`}>Cookies</Col>
            <Col className={`${styles.child}`}>Settings</Col>
            <Col className={`${styles.child}`}>Contents</Col>
          </Row>
          <div className={`${styles.small}`}>
            <Row className="flex-column mt-4 text-start">
              <Col>
                <hr className="m-0 mb-2" />
                {"©" + currentYear + " NextVerse"}
              </Col>
              <Col>
                Tutti i marchi qui riportati sono di proprietà dei rispettivi
                detentori.
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
