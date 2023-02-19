export const selectOption = (state = "default", action) => {
  if (action.type === "SET_SELECT_OPTION") {
    return action.payload;
  }
  return state;
};
