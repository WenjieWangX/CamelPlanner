import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

const SideBar = () => {
  const majors = useSelector((state) => state.advisors.map((e) => e.major));
  return (
    <div className="sidebar">
      <div className="sidebar__wrapper">
        <ul className="sidebar__list">
          <li className="sidebar__list-item">
            <NavLink to="/" exact activeClassName="active">
              <span className="item">Dashboard</span>
            </NavLink>
          </li>
          <li className="sidebar__list-item">
            <NavLink to="/calendar" exact activeClassName="active">
              <span className="item">Schedule Planner</span>
            </NavLink>
          </li>
          {majors.map((ele, idx) => {
            return (
              <li key={idx} className="sidebar__list-item">
                <NavLink to={`/courses/${ele}`} exact activeClassName="active">
                  <span className="item">{ele} Courses</span>
                </NavLink>
              </li>
            );
          })}
          <li className="sidebar__list-item">
            <NavLink to={`/departmentsCourses`} exact activeClassName="active">
              <span className="item">Other Courses</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
