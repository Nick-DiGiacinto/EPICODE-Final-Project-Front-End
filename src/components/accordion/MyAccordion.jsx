import React from "react";
import styles from "./accordion.module.css";

const MyAccordion = ({ children, showAccordion, setShowAccordion }) => {
  return (
    showAccordion && (
      <div className={`${styles.myAccordionOptions}`}>{children}</div>
    )
  );
};

MyAccordion.Game = ({ videogioco }) => {
  return (
    <div
      className={`${styles.myAccordionGameContainer} d-flex justify-content-end align-items-center flex-column`}
      style={{
        backgroundImage: `url(${videogioco?.immagine})`,
      }}
    >
      <div className={`${styles.myAccordionGameOptions}`}>
        <div className="d-flex justify-content-between align-items-center">
          <p>{videogioco?.titolo}</p>
          <div>
            <button className={`${styles.myAccordionPlay}`}>Play</button>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel totam
          accusantium, aliquam velit expedita consequuntur.
        </p>
      </div>
    </div>
  );
};

export default MyAccordion;
