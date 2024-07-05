const initialState = {
  library: [],
};

export const libraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_LIBRARY":
      return { ...state, library: action.payload };
    case "CLEAN_LIBRARY":
      return { ...state, library: null };
    default:
      return state;
  }
};
