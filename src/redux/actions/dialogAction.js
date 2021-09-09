export const openDialog = (dialogName) => {
  return {
    type: "dialog/openDialog",
    payload: dialogName,
  };
};

export const closeDialog = () => {
  return {
    type: "dialog/closeDialog"
  };
};