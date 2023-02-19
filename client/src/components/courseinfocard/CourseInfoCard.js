import React from "react";
import { setSelectCourses } from "../../actions";
import backend from "../../apis/backend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "./courseinfocard.css";

const CourseInfoCard = ({
  courseInfo,
  selectCourses,
  takenCourses,
  dispatch,
  term = "",
  option,
  userId,
}) => {
  const insertCourse = (courseInit, CRN) => {
    backend
      .post("/add", {
        userId: userId,
        courseInit: courseInit,
        CRN: CRN,
      })
      .then(() => dispatch(setSelectCourses(userId)));
  };

  const renderedCourseInfo = () => {
    const courseBlock = [];
    for (const [key, value] of Object.entries(courseInfo)) {
      if (option === "default") {
        continue;
      } else if (option === "filter") {
        if (term === "") {
          continue;
        } else if (key.includes(term.toUpperCase())) {
          for (const course of value) {
            const isOnCalendar = Object.values(selectCourses).some(
              (e) => e.courseInit.includes(key) && e.CRN === course.CRN
            );
            courseBlock.push(
              <div
                className={`coursecard ${isOnCalendar ? "on-calendar" : ""}`}
                key={course.CRN}
                onClick={() =>
                  insertCourse(course.dept + course.code, course.CRN)
                }
                disabled={isOnCalendar}
              >
                <div className="coursecard__container">
                  <Tippy content={course.name} animation="fade">
                    <span className="coursecard__title">
                      {Object.values(takenCourses).some((e) =>
                        e.course.includes(key)
                      ) ? (
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          className="color-icon-green"
                        />
                      ) : (
                        ""
                      )}
                      {course.name}
                    </span>
                  </Tippy>
                </div>
                <div className="coursecard__container">
                  <Tippy content={course.instructor} animation="fade">
                    <span className="coursecard__instructor">
                      {course.instructor}
                    </span>
                  </Tippy>
                </div>
                {course.time.map((ele, idx) => {
                  return (
                    <div key={idx} className="coursecard__container">
                      <Tippy
                        content={course.date[idx] + ":" + course.time[idx]}
                        animation="fade"
                      >
                        <span className="coursecard__time">
                          {course.date[idx] + ":" + course.time[idx]}
                        </span>
                      </Tippy>
                    </div>
                  );
                })}
                <div className="coursecard__container">
                  <Tippy content={`CRN: ${course.CRN}`} animation="fade">
                    <span className="coursecard__CRN">CRN: {course.CRN}</span>
                  </Tippy>
                </div>
              </div>
            );
          }
        }
      } else if (option === "search") {
        if (term === "") {
          continue;
        } else if (
          value.find((course) => course.name.includes(term.toUpperCase())) ||
          value.find((course) => course.dept.includes(term.toUpperCase())) ||
          term.toUpperCase().includes(key)
        ) {
          for (const course of value) {
            const isOnCalendar = Object.values(selectCourses).some(
              (e) => e.courseInit.includes(key) && e.CRN === course.CRN
            );
            courseBlock.push(
              <div
                className={`coursecard ${isOnCalendar ? "on-calendar" : ""}`}
                key={course.CRN}
                onClick={() =>
                  insertCourse(course.dept + course.code, course.CRN)
                }
                disabled={isOnCalendar}
              >
                <div className="coursecard__container">
                  <Tippy content={course.name} animation="fade">
                    <span className="coursecard__title">
                      {Object.values(takenCourses).some((e) =>
                        e.course.includes(key)
                      ) ? (
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          className="color-icon-green"
                        />
                      ) : (
                        ""
                      )}
                      {course.name}
                    </span>
                  </Tippy>
                </div>
                <div className="coursecard__container">
                  <Tippy content={course.instructor} animation="fade">
                    <span className="coursecard__instructor">
                      {course.instructor}
                    </span>
                  </Tippy>
                </div>
                {course.time.map((ele, idx) => {
                  return (
                    <div key={idx} className="coursecard__container">
                      <Tippy
                        content={course.date[idx] + ":" + course.time[idx]}
                        animation="fade"
                      >
                        <span className="coursecard__time">
                          {course.date[idx] + ":" + course.time[idx]}
                        </span>
                      </Tippy>
                    </div>
                  );
                })}
                <div className="coursecard__container">
                  <Tippy content={`CRN: ${course.CRN}`} animation="fade">
                    <span className="coursecard__CRN">CRN: {course.CRN}</span>
                  </Tippy>
                </div>
              </div>
            );
          }
        }
      }
    }
    return courseBlock;
  };

  return <>{renderedCourseInfo()}</>;
};

export default CourseInfoCard;
