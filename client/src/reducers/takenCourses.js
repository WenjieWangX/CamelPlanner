export const takenCourses = (state = [], action) => {
  if (action.type === "SET_TAKEN_COURSES") {
    return action.payload;
  }
  return state;
};
