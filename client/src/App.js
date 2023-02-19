import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import TopBar from "./components/topbar/TopBar";
import SideBar from "./components/sidebar/SideBar";
import SchedulePlanner from "./pages/scheduleplanner/SchedulePlanner";
import Courses from "./pages/courses/Courses";
import Dashboard from "./pages/dashboard/Dashboard";
import {
  setAllCourses,
  setAdvisor,
  setTakenCourses,
  setAllConncollCourses,
} from "./actions";
import "./app.css";

import Modal from "./components/modal/Modal";
import DepartmentCourses from "./pages/courses/DepartmentsCourses";

const App = () => {
  const user = useSelector((state) => state.user);
  const majors = useSelector((state) => state.advisors.map((e) => e.major));
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(true);

  useEffect(() => {
    dispatch(setAllCourses());
    dispatch(setAllConncollCourses());
  }, []);

  useEffect(() => {
    if (user.status === "Completed") {
      setOpenModal(false);
    }
    dispatch(setAdvisor(user.id));
    dispatch(setTakenCourses(user.id));
  }, [user.status]);

  return (
    <div>
      <TopBar />
      {openModal ? (
        <>
          <Modal />
        </>
      ) : (
        <>
          <div className="container">
            <BrowserRouter>
              <SideBar />
              <Route path="/" exact component={Dashboard} />
              <Route path="/calendar" exact component={SchedulePlanner} />
              {majors.map((ele, idx) => {
                return (
                  <Route
                    key={idx}
                    path={`/courses/${ele}`}
                    exact
                    component={() => <Courses major={ele} />}
                  />
                );
              })}
              <Route
                path="/departmentsCourses"
                exact
                component={DepartmentCourses}
              />
            </BrowserRouter>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
