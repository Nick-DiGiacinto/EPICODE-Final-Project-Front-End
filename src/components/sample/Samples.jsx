import React from "react";
import { Carousel, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./samples.module.css";

export const Samples = ({ prodotti, categoria }) => {
  //Suddivido l'array di prodotti in gruppi da 3
  // const groupedElements = [];
  // const arrayCategoria = prodotti.filter(
  //   (elemento) => elemento.categoria === categoria
  // );
  // for (let i = 0; i < arrayCategoria.length; i += 3s) {
  //   groupedElements.push(arrayCategoria.slice(i, i + 3));
  // }

  const navigate = useNavigate();
  // const numberOfElements = 6;
  // const startIndex = Math.floor(
  //   Math.random() * (prodotti.length - numberOfElements + 1)
  // );
  // const endIndex = startIndex + numberOfElements;

  return (
    <>
      <Container>
        <Row>
          {prodotti.length > 0 &&
            prodotti.slice(4, 12).map((vg, i) => (
              <Col className="mt-3 p-3" key={i} xs={12} md={6} lg={4} xl={3}>
                <Image
                  loading="lazy"
                  fluid
                  src={vg.immagine}
                  alt="slide"
                  className={`${styles.slides}`}
                  onClick={() => navigate(`/store/${vg.id}`)}
                  style={{
                    cursor: "pointer",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};
