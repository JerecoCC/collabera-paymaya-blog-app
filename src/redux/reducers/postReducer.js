const initialState = {
  selectedId: null,
  updateList: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "post/setSelected":
      return {
        ...state,
        selectedId: action.payload
      };
    case "post/shouldUpdateList":
      return {
        ...state,
        updateList: action.payload
      };
    default:
      return state;
  }
};

export default postReducer;
