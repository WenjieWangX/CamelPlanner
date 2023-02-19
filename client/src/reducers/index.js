import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { selectCourse } from "./selectCourse";
import { allCourses } from "./allCourses";
import { selectOption } from "./selectOption";
import { user } from "./user";
import { courses } from "./courses";
import { advisors } from "./advisors";
import { takenCourses } from "./takenCourses";
import { connCourses } from "./connCourses";

export default combineReducers({
  selectCourse,
  allCourses,
  form: formReducer,
  selectOption,
  user,
  courses,
  advisors,
  takenCourses,
  connCourses,
});
