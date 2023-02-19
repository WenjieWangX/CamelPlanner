import React from "react";
import Tippy from "@tippyjs/react";
import { useDispatch, useSelector } from "react-redux";
import backend from "../../apis/backend";
import { setTakenCourses } from "../../actions";

import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "./coursebox.css";

const CourseBox = ({ courseInit, courseName, courseStatus }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const takenCourses = useSelector((state) => state.takenCourses);

  const updateCourse = async (courseId, status) => {
    await backend.put(`/updateCourseStatus/${courseId}`, {
      status: status,
    });
    dispatch(setTakenCourses(user.id));
  };

  const addCourse = async (course, status) => {
    await backend.post("/addUserCourse", {
      userId: user.id,
      courses: [course],
      status: status,
    });
    dispatch(setTakenCourses(user.id));
  };

  const renderStatusButtons = (courseStatus, courseInit) => {
    return (
      <div className="coursebox__grid">
        <button
          className={`coursebox__button-selector ${
            courseStatus === 0 ? "selected" : ""
          }`}
          onClick={() =>
            Object.values(takenCourses).some((e) =>
              e.course.includes(courseInit)
            )
              ? updateCourse(
                  takenCourses.find((e) => e.course === courseInit).id,
                  0
                )
              : addCourse(courseInit, 0)
          }
        >
          <div className="coursebox__button-selector-text">Have Not Taken</div>
        </button>
        <button
          className={`coursebox__button-selector ${
            courseStatus === 1 ? "selected" : ""
          }`}
          onClick={() =>
            Object.values(takenCourses).some((e) =>
              e.course.includes(courseInit)
            )
              ? updateCourse(
                  takenCourses.find((e) => e.course === courseInit).id,
                  1
                )
              : addCourse(courseInit, 1)
          }
        >
          <div className="coursebox__button-selector-text">In Progress</div>
        </button>
        <button
          className={`coursebox__button-selector ${
            courseStatus === 2 ? "selected" : ""
          }`}
          onClick={() =>
            Object.values(takenCourses).some((e) =>
              e.course.includes(courseInit)
            )
              ? updateCourse(
                  takenCourses.find((e) => e.course === courseInit).id,
                  2
                )
              : addCourse(courseInit, 2)
          }
        >
          <div className="coursebox__button-selector-text">Completed</div>
        </button>
      </div>
    );
  };

  return (
    <Tippy
      theme="light"
      placement="right"
      interactive="true"
      trigger="click"
      content={renderStatusButtons(courseStatus, courseInit)}
    >
      <div className="coursebox">
        <Tippy
          content={
            courseStatus === 2
              ? "Completed"
              : courseStatus === 1
              ? "In Progress"
              : "Have Not Taken"
          }
          animation="fade"
        >
          <div
            className="coursebox__status"
            style={{
              backgroundColor: `${
                courseStatus === 2
                  ? "#36B37E"
                  : courseStatus === 1
                  ? "#FFAB00"
                  : "transparent"
              }`,
            }}
          ></div>
        </Tippy>
        <Tippy content={courseInit + ": " + courseName} animation="fade">
          <div className="coursebox__longest-rectangle">
            <span className="coursebox__course-name">
              {courseInit + ": " + courseName}
            </span>
          </div>
        </Tippy>
      </div>
    </Tippy>
  );
};

export default CourseBox;
