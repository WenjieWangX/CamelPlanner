export const courses = (state = "", action) => {
  if (action.type === "SET_CURRENT_COURSES") {
    return action.payload;
  }

  return state;
};
