import backend from "../apis/backend";

// set the course that select to the calendar
export const setSelectCourses = (id) => async (dispatch) => {
  const response = await backend.get("/usercourses", {
    params: { id: id },
  });
  dispatch({
    type: "SET_SELECT_COURSES",
    payload: response.data,
  });
};

// delete select course from calendar
export const deleteCourse = (CRN) => {
  return {
    type: "DELETE_COURSE",
    payload: CRN,
  };
};

// set the option choose for filter courses
export const setSelectOption = (choice) => {
  return {
    type: "SET_SELECT_OPTION",
    payload: choice,
  };
};

// set or get all the courses offer by Conncoll
export const setAllConncollCourses = (id) => async (dispatch) => {
  const response = await backend.get("/connCourses");
  dispatch({
    type: "SET_ALL_CONNCOLL_COURSES",
    payload: response.data,
  });
};

//Get all the courses offering next semester
export const setAllCourses = () => async (dispatch) => {
  const response = await backend.get("/courses");
  dispatch({ type: "SET_ALL_COURSES", payload: response.data });
};

//get all the courses that they selected to the calendar
export const setCurrentCourses = (id) => async (dispatch) => {
  const response = await backend.get("/usercourses", {
    params: { id: id },
  });
  dispatch({
    type: "SET_CURRENT_COURSES",
    payload: response.data,
  });
};

//get user informations
export const setUser = (name) => async (dispatch) => {
  const response = await backend.get("/user", {
    params: { name: name },
  });
  if (response.data.length) {
    dispatch({ type: "SET_USER", payload: response.data[0] });
  } else {
    await backend.post("/addUser", {
      name: name,
      status: "Progress",
    });

    const res = await backend.get("/user", {
      params: { name: name },
    });

    dispatch({ type: "SET_USER", payload: res.data[0] });
  }
};

//get user information for advisor(s) and major(s)
export const setAdvisor = (id) => async (dispatch) => {
  const response = await backend.get("/advisors", {
    params: { id: id },
  });

  dispatch({ type: "SET_ADVISORS", payload: response.data });
};

// export const deleteMajor = (id) => {
//   return {
//     type: "DELETE_ADVISOR",
//     payload: id,
//   };
// };

//get all the courses that already taken by the user
export const setTakenCourses = (id) => async (dispatch) => {
  const response = await backend.get("/takenCourses", {
    params: { id: id },
  });

  dispatch({ type: "SET_TAKEN_COURSES", payload: response.data });
};
