// AGGIUNGI ALLA WISHLIST

const addToWish = (prodotto) => {
  return { type: "ADD_TO_WISH", payload: prodotto };
};

export default addToWish;
