export const allCourses = (state = {}, action) => {
  if (action.type === "SET_ALL_COURSES") {
    return { ...state, ...action.payload };
  }

  return state;
};
