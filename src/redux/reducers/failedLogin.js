const initialState = {
  failedLogin: false,
};

const failedLogin = (state = initialState, action) => {
  switch (action.type) {
    case "NOT_FOUND":
      return { ...state, failedLogin: action.payload };
    default:
      return state;
  }
};

export default failedLogin;
