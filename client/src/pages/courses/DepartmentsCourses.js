import React, { useState } from "react";
import { useSelector } from "react-redux";

import CourseBox from "../../components/coursebox/CourseBox";
import Dropdown from "../../components/dropdown/Dropdown";

import { department } from "../../dummyData";

import "./courses.css";

const DepartmentCourses = () => {
  const takenCourses = useSelector((state) => state.takenCourses);
  const connCourses = useSelector((state) => state.connCourses);
  const [departmentSubj, setDepartmentSubj] = useState("");

  const handleDepartmentChange = (event) => {
    setDepartmentSubj(event.value);
  };

  const Comparator = (a, b) => {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    return 0;
  };

  const renderCoursesBox = (level) => {
    const majorConnCourses = Object.fromEntries(
      Object.entries(connCourses).filter(([key]) => {
        let courseLevel = key.match(/(\d+)/);

        if (
          key.includes(departmentSubj) &&
          parseInt(courseLevel[0]) >= level &&
          parseInt(courseLevel[0]) <= level + 100
        ) {
          return true;
        }

        return false;
      })
    );

    let coursesBox = [];
    for (const [key, value] of Object.entries(majorConnCourses).sort(
      Comparator
    )) {
      if (value.courseName.includes("LAB")) {
        continue;
      }
      const isTakenCourse = Object.values(takenCourses).some((e) =>
        e.course.includes(key)
      );
      const courseStatus = isTakenCourse
        ? takenCourses.find((e) => e.course === key).status
        : 0;
      coursesBox.push(
        <CourseBox
          key={key}
          courseInit={key}
          courseName={value.courseName}
          courseStatus={courseStatus}
        />
      );
    }
    return coursesBox;
  };

  return (
    <div className="courses courses-grid">
      <div className="courses__card">
        <div className="card__info">
          <h1 className="card--title">Courses</h1>
          <>
            <label htmlFor="department-filter">Choose Department</label>
            <Dropdown
              id="department-filter"
              options={department}
              onChange={handleDepartmentChange}
            />
          </>
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
                {Object.keys(connCourses).length && departmentSubj
                  ? renderCoursesBox(100)
                  : ""}
              </div>
              <div>
                {Object.keys(connCourses).length && departmentSubj
                  ? renderCoursesBox(200)
                  : ""}
              </div>
              <div>
                {Object.keys(connCourses).length && departmentSubj
                  ? renderCoursesBox(300)
                  : ""}
              </div>
              <div>
                {Object.keys(connCourses).length && departmentSubj
                  ? renderCoursesBox(400)
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCourses;
