import _ from "lodash";

export const advisors = (state = [], action) => {
  switch (action.type) {
    case "SET_ADVISORS":
      return action.payload;
    case "DELETE_ADVISOR":
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
