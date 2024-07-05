import { Col, Image } from "react-bootstrap";
import styles from "./item.module.css";
import React, { useState } from "react";
import MyAccordion from "../accordion/MyAccordion";

export const Item = ({ videogioco, onSelect }) => {
  const [showAccordion, setShowAccordion] = useState(false);
  const handleSelect = (item) => {
    setShowAccordion(!showAccordion);
    onSelect(item);
  };

  return (
    <div className="mb-3 w-100">
      <Col className={`${styles.row}`}>
        <div className={`${styles.roundImg}`}>
          <img alt="img" src={videogioco?.immagine}></img>
        </div>
        <span onClick={() => handleSelect(videogioco)}>
          {videogioco?.titolo}
        </span>
      </Col>
      <Col className="d-lg-none">
        <div
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
        >
          <MyAccordion
            showAccordion={showAccordion}
            setShowAccordion={setShowAccordion}
          >
            <MyAccordion.Game videogioco={videogioco} />
          </MyAccordion>
        </div>
      </Col>
    </div>
  );
};
