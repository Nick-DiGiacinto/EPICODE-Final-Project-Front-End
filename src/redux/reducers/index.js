const initialState = {
  bearerToken: null,
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TOKEN":
      return { ...state, bearerToken: action.payload };
    case "LOGOUT":
      return { ...state, bearerToken: action.payload };
    default:
      return state;
  }
};

export default tokenReducer;
