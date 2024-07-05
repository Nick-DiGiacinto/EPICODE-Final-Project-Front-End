const initialState = {
  wish: [],
};

const wishReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_WISH":
      const isDuplicate = state.wish.some(
        (elemento) => elemento.id === action.payload.id
      );
      if (!isDuplicate) {
        return { ...state, wish: [...state.wish, action.payload] };
      } else {
        console.log("Elemento già presente nella lista!");
      }
      return state;
    case "DELETE_FROM_WISH":
      return {
        ...state,
        wish: state.wish.filter((element) => element.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default wishReducer;
