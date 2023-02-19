export const user = (state = "", action) => {
  if (action.type === "SET_USER") {
    return action.payload;
  }

  return state;
};
