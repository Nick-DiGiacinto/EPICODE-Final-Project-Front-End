import React from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MyAlert = ({ variant }) => {
  //  variants = [
  //   "primary",
  //   "secondary",
  //   "success",
  //   "danger",
  //   "warning",
  //   "info",
  //   "light",
  //   "dark",
  // ];

  return (
    <>
      <Alert variant={variant}>
        Non è stato trovato alcun utente. Vuoi{" "}
        <Link to={"/register"}>effettuare la registrazione?</Link>
      </Alert>
    </>
  );
};
