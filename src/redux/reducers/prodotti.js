const initialState = {
  prodotti: [],
};

const prodottiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_FETCH":
      return { ...state, prodotti: action.payload };
    default:
      return state;
  }
};

export default prodottiReducer;
