export const setSelected = (id) => {
  return {
    type: "post/setSelected",
    payload: id,
  };
};

export const shouldUpdateList = (shouldUpdate) => {
  return {
    type: "post/shouldUpdateList",
    payload: shouldUpdate,
  };
};

export const setSortBy = (sortBy) => {
  return {
    type: "post/setSortBy",
    payload: sortBy,
  };
};

export const setKeyword = (keyword) => {
  return {
    type: "post/setKeyword",
    payload: keyword,
  };
};
