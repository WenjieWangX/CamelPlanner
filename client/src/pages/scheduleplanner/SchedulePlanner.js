import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setSelectOption } from "../../actions";

import ScheduleBlock from "../../components/scheduleblock/ScheduleBlock";
import CourseInfoCard from "../../components/courseinfocard/CourseInfoCard";
import Dropdown from "../../components/dropdown/Dropdown";

import { department } from "../../dummyData";

import "./scheduleplanner.css";

const SchedulePlanner = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");

  const user = useSelector((state) => state.user);
  const selectCourses = useSelector((state) => state.selectCourse);
  const allCourses = useSelector((state) => state.allCourses);
  const choice = useSelector((state) => state.selectOption);
  const takenCourses = useSelector((state) => state.takenCourses);

  const handleOptionChange = (event) => {
    setTerm("");
    dispatch(setSelectOption(event.value));
  };

  const handleDepartmentChange = (event) => {
    setTerm(event.value);
  };

  const handleSearchChange = (event) => {
    setTerm(event.target.value);
  };

  const renderedSelectedClass = () => {
    let currentCourseBlock = [];
    let count = 1;
    for (const [key, value] of Object.entries(selectCourses)) {
      for (let i = 0; i < allCourses[value.courseInit].length; i++) {
        let course = allCourses[value.courseInit][i];
        if (course.CRN !== value.CRN) {
          continue;
        }
        const modifyTime = course.time.map((time) => {
          let currentTime = time
            .replaceAll(":", "")
            .replaceAll(" ", "")
            .split("-");
          const twelveHoursToTwentyFourHours = currentTime.map((t) => {
            if (t.includes("am")) {
              t = t.replaceAll("am", "");
              if (t.length < 4) {
                t = "0" + t;
              }
            } else if (t.includes("pm")) {
              t = t.replaceAll("pm", "");
              if (t.length < 4) {
                let hour = parseInt(t[0]);
                hour = hour + 12;
                t = hour.toString() + t.substring(1, t.length);
              } else if (t.substring(0, 2) === "10") {
                let hour = parseInt(t.substring(0, 2));
                hour = hour + 12;
                t = hour.toString() + t.substring(2, t.length);
              }
            }
            return t;
          });
          return twelveHoursToTwentyFourHours;
        });
        const modifyDate = course.date.map((date) => {
          return date.toLowerCase();
        });
        const courseInfo = {
          CRN: course.CRN,
          name: course.name,
          deptCode: `${course.dept} ${course.code}`,
          time: course.time,
          date: course.date,
          instructor: course.instructor,
          modifyTime: modifyTime,
          modifyDate: modifyDate,
          id: key,
          courseId: value.id,
        };
        currentCourseBlock.push(
          <ScheduleBlock
            key={courseInfo.id}
            courseInfo={courseInfo}
            dispatch={dispatch}
            courseNum={count % 10}
          />
        );
        count++;
      }
    }
    return currentCourseBlock;
  };

  return (
    <div className="schedule schedule-grid">
      <div className="card grid-col-span-3">
        <div className="card__info">
          <h1 className="card--title"> Course Schedule</h1>
          <div className="schedule--content">
            <div className="schedule--table">
              <span
                className="track-slot"
                aria-hidden="true"
                style={{ gridArea: "Monday" }}
              >
                Monday
              </span>
              <span
                className="track-slot"
                aria-hidden="true"
                style={{ gridArea: "Tuesday" }}
              >
                Tuesday
              </span>
              <span
                className="track-slot"
                aria-hidden="true"
                style={{ gridArea: "Wednesday" }}
              >
                Wednesday
              </span>
              <span
                className="track-slot"
                aria-hidden="true"
                style={{ gridArea: "Thursday" }}
              >
                Thursday
              </span>
              <span
                className="track-slot"
                aria-hidden="true"
                style={{ gridArea: "Friday" }}
              >
                Friday
              </span>
              <h2 className="time-slot" style={{ gridArea: "time-0800" }}>
                8:00am
              </h2>

              <div
                className="schedule--line"
                style={{ gridRow: "time-0800" }}
              ></div>

              <h2 className="time-slot" style={{ gridArea: "time-0900" }}>
                9:00am
              </h2>

              <div
                className="schedule--line grid-col-span-5"
                style={{ gridRow: "time-0900" }}
              ></div>
              <h2 className="time-slot" style={{ gridArea: "time-1000" }}>
                10:00am
              </h2>

              <div
                className="schedule--line grid-col-span-5"
                style={{ gridRow: "time-1000" }}
              ></div>
              <h2 className="time-slot" style={{ gridArea: "time-1100" }}>
                11:00am
              </h2>

              <div
                className="schedule--line grid-col-span-5"
                style={{ gridRow: "time-1100" }}
              ></div>
              <h2 className="time-slot" style={{ gridArea: "time-1200" }}>
                12:00am
              </h2>

              <div
                className="schedule--line grid-col-span-5"
                style={{ gridRow: "time-1200" }}
              ></div>
              <h2 className="time-slot" style={{ gridArea: "time-1300" }}>
                1:00pm
              </h2>

              <div
                className="schedule--line grid-col-span-5"
                style={{ gridRow: "time-1300" }}
              ></div>
              <h2 className="time-slot" style={{ gridArea: "time-1400" }}>
                2:00pm
              </h2>

              <div
                className="schedule--line grid-col-span-5"
                style={{ gridRow: "time-1400" }}
              ></div>
              <h2 className="time-slot" style={{ gridArea: "time-1500" }}>
                3:00pm
              </h2>

              <div
                className="schedule--line grid-col-span-5"
                style={{ gridRow: "time-1500" }}
              ></div>

              <h2 className="time-slot" style={{ gridArea: "time-1600" }}>
                4:00pm
              </h2>

              <div
                className="schedule--line grid-col-span-5"
                style={{ gridRow: "time-1600" }}
              ></div>
              <h2 className="time-slot" style={{ gridArea: "time-1700" }}>
                5:00pm
              </h2>

              <div
                className="schedule--line grid-col-span-5"
                style={{ gridRow: "time-1700" }}
              ></div>
              <h2 className="time-slot" style={{ gridArea: "time-1800" }}>
                6:00pm
              </h2>

              <div
                className="schedule--line grid-col-span-5"
                style={{ gridRow: "time-1800" }}
              ></div>
              <h2 className="time-slot" style={{ gridArea: "time-1900" }}>
                7:00pm
              </h2>

              <div
                className="schedule--line grid-col-span-5"
                style={{ gridRow: "time-1900" }}
              ></div>
              <h2 className="time-slot" style={{ gridArea: "time-2000" }}>
                8:00pm
              </h2>

              <div
                className="schedule--line grid-col-span-5"
                style={{ gridRow: "time-2000" }}
              ></div>
              <h2 className="time-slot" style={{ gridArea: "time-2100" }}>
                9:00pm
              </h2>

              <div
                className="schedule--line grid-col-span-5"
                style={{ gridRow: "time-2100" }}
              ></div>
              <h2 className="time-slot" style={{ gridArea: "time-2200" }}>
                10:00pm
              </h2>

              <div
                className="schedule--line grid-col-span-5"
                style={{ gridRow: "time-2200" }}
              ></div>
              {Object.keys(allCourses).length ? renderedSelectedClass() : ""}
            </div>
          </div>
        </div>
      </div>

      {/* Course select container */}
      <div className="card bg-primary">
        <div className="card__info">
          <label htmlFor="filter-method">Choose Options</label>
          <Dropdown
            id="filter-method"
            options={[
              { value: "filter", label: "Filter" },
              { value: "search", label: "Search" },
            ]}
            onChange={handleOptionChange}
          />
          {choice === "default" ? (
            ""
          ) : choice === "filter" ? (
            <>
              <label htmlFor="department-filter">Choose Department</label>
              <Dropdown
                id="department-filter"
                options={department}
                onChange={handleDepartmentChange}
              />
            </>
          ) : (
            <>
              <label htmlFor="course-search-bar">Search Courses</label>
              <input
                value={term}
                onChange={handleSearchChange}
                className="search-bar"
                placeholder="Search..."
              />
            </>
          )}

          <div className="card__container">
            <CourseInfoCard
              courseInfo={allCourses}
              selectCourses={selectCourses}
              takenCourses={takenCourses}
              dispatch={dispatch}
              term={term}
              option={choice}
              userId={user.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePlanner;
