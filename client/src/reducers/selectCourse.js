import _ from "lodash";

export const selectCourse = (state = {}, action) => {
  switch (action.type) {
    case "SET_SELECT_COURSES":
      return { ...state, ...action.payload };
    case "DELETE_COURSE":
      return _.omit(state, action.payload);
    case "ADD_COURSE":
      return { ...state, ..._.mapKeys(action.payload, "CRN") };
    default:
      return state;
  }
};
