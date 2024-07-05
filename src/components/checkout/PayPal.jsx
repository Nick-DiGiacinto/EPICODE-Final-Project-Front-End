import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";
import { useDispatch } from "react-redux";

const PayPal = ({
  cart,
  token,
  setBought,
  setGifted,
  setFailedGift,
  setShowPayPal,
  setShowPayPalGift,
  username,
  giftUser,
  action,
  id,
}) => {
  const dispatch = useDispatch();

  const sendGift = async () => {
    // console.log("TOKEN", token);
    // console.log("ID: ", id);
    try {
      const data = cart;
      const response = await fetch(
        `http://localhost:8090/checkout/gift/${giftUser}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        console.log(response);
        const responseData = await response.json();
        console.log(responseData);
        console.log("Regalo inviato");
        setGifted(true);
        dispatch({
          type: "CLEAN_CART",
        });
      } else {
        setGifted(false);
        setFailedGift(true);
        throw new Error("Response not ok");
      }
    } catch (error) {
      console.log("CATCH: ", error);
    }
  };

  const addToLibrary = async () => {
    // console.log("TOKEN", token);
    // console.log("ID: ", id);
    try {
      const data = cart;
      const response = await fetch(
        `http://localhost:8090/checkout/addAll/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        console.log(response);
        const responseData = await response.json();
        console.log(responseData);
        console.log("CART", cart);
        setBought(true);
        dispatch({
          type: "CLEAN_CART",
        });
      } else {
        setBought(false);
        throw new Error("Response not ok");
      }
    } catch (error) {
      console.log("CATCH: ", error);
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        currency: "EUR",
        "client-id": process.env.REACT_APP_CLIENT_ID,
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: `${cart.reduce(
                    (acc, element) => acc + parseInt(element.prezzo),
                    0
                  )}`,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          if (action === "buy") {
            addToLibrary();
            // setShowPayPal(false);
          } else if (action === "gift") {
            sendGift();
            // setShowPayPalGift(false);
          }

          return actions.order.capture().then(function (details) {
            alert("Transazione andata a buon fine per " + username);
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPal;
