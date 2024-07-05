const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((element) => action.payload.id !== element.id),
      };
    case "CLEAN_CART":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
