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
