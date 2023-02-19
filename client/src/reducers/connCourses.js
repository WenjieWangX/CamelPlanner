export const connCourses = (state = {}, action) => {
  if (action.type === "SET_ALL_CONNCOLL_COURSES") {
    return action.payload;
  }

  return state;
};
