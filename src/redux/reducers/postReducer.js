import { SORT_BY } from "../../utils/constants";

const initialState = {
  selectedId: null,
  updateList: false,
  sortBy: SORT_BY.TITLE,
  keyword: "",
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "post/setSelected":
      return {
        ...state,
        selectedId: action.payload,
      };
    case "post/shouldUpdateList":
      return {
        ...state,
        updateList: action.payload,
      };
    case "post/setSortBy":
      return {
        ...state,
        sortBy: action.payload,
      }
    case "post/setKeyword":
      return {
        ...state,
        keyword: action.payload,
      }
    default:
      return state;
  }
};

export default postReducer;
