export const addToCart = (prodotto) => {
  console.log("Gioco aggiunto al carrello");
  return {
    type: "ADD_TO_CART",
    payload: prodotto,
  };
};
