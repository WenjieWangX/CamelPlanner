import React from "react";
import { useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import "./courseinfocard.css";

const CourseCardDash = ({ courseInfo }) => {
  const allCourses = useSelector((state) => state.allCourses);
  const connCourses = useSelector((state) => state.connCourses);
  const renderedCourseInfo = () => {
    const courseBlock = [];
    for (const [key, value] of Object.entries(courseInfo)) {
      courseBlock.push(
        <div className="coursecard" key={key}>
          <div className="coursecard__container">
            <Tippy
              content={`Course Subject Name/Number: ${
                connCourses[value.course].courseInit
              }`}
              animation="fade"
            >
              <span className="coursecard__title">
                {connCourses[value.course].courseInit}
              </span>
            </Tippy>
          </div>
          <div className="coursecard__container">
            <Tippy
              content={`Course Name: ${connCourses[value.course].courseName}`}
              animation="fade"
            >
              <span className="coursecard__course-name">
                {connCourses[value.course].courseName}
              </span>
            </Tippy>
          </div>
          <div>
            <span className="coursecard__credit">
              {`Credit: ${connCourses[value.course].credit}`}
            </span>
          </div>
          {allCourses[value.course]
            ? allCourses[value.course].map((course, idx) => {
                return (
                  <div key={idx}>
                    <div className="coursecard__container">
                      <Tippy
                        content={`Course Instructor: ${course.instructor}`}
                        animation="fade"
                      >
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
                  </div>
                );
              })
            : ""}
        </div>
      );
    }

    return courseBlock;
  };

  return <>{Object.keys(connCourses).length ? renderedCourseInfo() : ""}</>;
};

export default CourseCardDash;
