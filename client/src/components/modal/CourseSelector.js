import React from "react";
import { useSelector } from "react-redux";
import { majorInit } from "../../dummyData";
import "./modal.css";

import DataButton from "./DataButton";

const CourseSelector = ({
  title,
  major,
  userInfo,
  setUserInfo,
  progressCourses = [],
}) => {
  const connCourses = useSelector((state) => state.connCourses);

  const Comparator = (a, b) => {
    if (a[0] > b[0]) return -1;
    if (a[0] < b[0]) return 1;
    return 0;
  };

  const renderCoursesBox = (level) => {
    const majorConnCourses = Object.fromEntries(
      Object.entries(connCourses).filter(([key]) => {
        for (const deptInit of majorInit[major]) {
          if (key.includes(deptInit)) {
            return true;
          }
        }
        return false;
      })
    );
    let coursesBox = [];
    for (const [key, value] of Object.entries(majorConnCourses).sort(
      Comparator
    )) {
      const isTakenCourse = progressCourses.length
        ? progressCourses.includes(key + ": " + value.courseName)
        : false;
      if (isTakenCourse || value.courseName.includes("LAB")) {
        continue;
      }
      let matches = key.match(/(\d+)/);
      if (
        100 <= parseInt(matches[0]) &&
        parseInt(matches[0]) < 200 &&
        level === 100
      ) {
        coursesBox.push(
          <DataButton
            key={key}
            isFullWidth={true}
            isUnique={false}
            value={key + ": " + value.courseName}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        );
        continue;
      }

      if (
        200 <= parseInt(matches[0]) &&
        parseInt(matches[0]) < 300 &&
        level === 200
      ) {
        coursesBox.push(
          <DataButton
            key={key}
            isFullWidth={true}
            isUnique={false}
            value={key + ": " + value.courseName}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        );
        continue;
      }
      if (
        300 <= parseInt(matches[0]) &&
        parseInt(matches[0]) < 400 &&
        level === 300
      ) {
        coursesBox.push(
          <DataButton
            key={key}
            isFullWidth={true}
            isUnique={false}
            value={key + ": " + value.courseName}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        );
        continue;
      }

      if (
        400 <= parseInt(matches[0]) &&
        parseInt(matches[0]) < 500 &&
        level === 400
      ) {
        coursesBox.push(
          <DataButton
            key={key}
            isFullWidth={true}
            isUnique={false}
            value={key + ": " + value.courseName}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        );
        continue;
      }
    }
    return coursesBox.reverse();
  };

  return (
    <>
      <div className="modal__title-majorpage">
        <h1>{title}</h1>
      </div>
      <div className="modal__button-container">
        <div className="courses--content">
          <div className="courses--table">
            <div>
              <span className="courses__major-title" aria-hidden="true">
                100 Level
              </span>
            </div>
            <div>
              <span className="courses__major-title" aria-hidden="true">
                200 Level
              </span>
            </div>
            <div>
              <span className="courses__major-title" aria-hidden="true">
                300 Level
              </span>
            </div>
            <div>
              <span className="courses__major-title" aria-hidden="true">
                400 level
              </span>
            </div>
            <div>
              {Object.keys(connCourses).length ? renderCoursesBox(100) : ""}
            </div>
            <div>
              {Object.keys(connCourses).length ? renderCoursesBox(200) : ""}
            </div>
            <div>
              {Object.keys(connCourses).length ? renderCoursesBox(300) : ""}
            </div>
            <div>
              {Object.keys(connCourses).length ? renderCoursesBox(400) : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseSelector;
