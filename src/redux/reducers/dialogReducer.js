const initialState = {
  name: "",
  isOpen: false,
};

const dialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "dialog/openDialog":
      return {
        ...state,
        name: action.payload,
        isOpen: true
      };
    case "dialog/closeDialog":
      return {
        ...state,
        name: "",
        isOpen: false
      };
    default:
      return state;
  }
};

export default dialogReducer;
