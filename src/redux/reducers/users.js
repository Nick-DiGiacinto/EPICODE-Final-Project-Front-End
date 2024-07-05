const initialState = {
  users: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER":
      return { ...state, users: action.payload };
    case "LOGOUT_USER":
      return { ...state, users: null };
    default:
      return state;
  }
};

export default usersReducer;
