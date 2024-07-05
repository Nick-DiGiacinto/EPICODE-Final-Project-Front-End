import React from "react";
import { CiCircleRemove } from "react-icons/ci";
import "./item.css";
import { useDispatch } from "react-redux";

export const Item = ({ prodotto }) => {
  const dispatch = useDispatch();
  return (
    <tr>
      {/* <Col className="d-flex justify-content-between border">
        <h4>{prodotto.titolo}</h4>
        <p>{prodotto.prezzo}</p>
      </Col> */}
      <td className="text-center">{prodotto.titolo}</td>
      <td className="text-center">{prodotto.prezzo} €</td>
      <td className="text-center">
        <CiCircleRemove
          onClick={() =>
            dispatch({ type: "REMOVE_FROM_CART", payload: prodotto })
          }
          className="remove"
        />
      </td>
    </tr>
  );
};
