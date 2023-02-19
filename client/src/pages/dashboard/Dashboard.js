import React, { useState } from "react";
import { useSelector } from "react-redux";

import UpdateModal from "../../components/modal/UpdateModal";
import CourseCardDash from "../../components/courseinfocard/CourseCardDash";

import Chart from "./Chart";
import Tippy from "@tippyjs/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableList,
  faPercentage,
  faBook,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import { majorRequirementCourses, majorInit } from "../../dummyData";

import "./dashboard.css";

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);

  const advisors = useSelector((state) => state.advisors);
  const takenCourses = useSelector((state) => state.takenCourses);
  const currentCourse = takenCourses.filter((e) => e.status === 1);
  const connCourses = useSelector((state) => state.connCourses);

  const totalCredit = (courses) => {
    let total = 0;
    for (const value of Object.values(courses)) {
      if (value.status !== 2) {
        continue;
      }
      total += parseInt(connCourses[value.course].credit);
    }
    return total;
  };

  const majorRequirementPercentage = (courses, major) => {
    const init = majorInit[major];
    const requireCourses = majorRequirementCourses[major]["core courses"];
    let electives200 = majorRequirementCourses[major].electives200;
    let electives300 = majorRequirementCourses[major].electives300;

    const total = majorRequirementCourses[major].total;

    let count = 0;
    for (const value of Object.values(courses)) {
      let match = value.course.match(/(\d+)/);
      if (value.status !== 2) {
        continue;
      }
      if (requireCourses.includes(value.course)) {
        count += 1;
      } else if (
        init.some((ele) => value.course.includes(ele)) &&
        parseInt(match[0]) >= 200 &&
        parseInt(match[0]) <= 300 &&
        electives200
      ) {
        count += 1;
        electives200 -= 1;
      } else if (
        init.some((ele) => value.course.includes(ele)) &&
        parseInt(match[0]) >= 300 &&
        parseInt(match[0]) <= 400 &&
        electives300
      ) {
        count += 1;
        electives300 -= 1;
      }
    }
    return ((count / total) * 100).toFixed(2);
  };

  const degreeProgressData = (courses, userMajors) => {
    let userData = [
      {
        name: "Total",
        percentage:
          takenCourses && connCourses
            ? (totalCredit(takenCourses) / 128) * 100 > 100
              ? 100
              : ((totalCredit(takenCourses) / 128) * 100).toFixed(2)
            : 0,
      },
    ];

    for (const value of Object.values(userMajors)) {
      userData.push({
        name: value.major,
        percentage: takenCourses
          ? majorRequirementPercentage(courses, value.major) > 100
            ? 100
            : majorRequirementPercentage(courses, value.major)
          : 0,
      });
    }

    return userData;
  };

  return (
    <>
      {openModal ? (
        <UpdateModal handleInfoChange={setOpenModal} />
      ) : (
        <div className="dashboard dashboard-grid">
          {/* Advisor */}
          <div className="dashboard__card">
            <div className="dashboard__card-info">
              <div className="dashboard__card-title">
                Advisor(s)
                <Tippy content={"edit"}>
                  <div
                    onClick={() => setOpenModal(!openModal)}
                    className="dashboard__edit"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </div>
                </Tippy>
              </div>
              {advisors.map((ele, idx) => {
                return (
                  <div key={idx} className="dashboard__card-container flex">
                    <div className="dashboard__card-icon flex">
                      <img
                        src="https://supercharge.info/images/avatar-placeholder.png"
                        alt="user phote"
                        className="topbar__avatar"
                      />
                    </div>
                    <div className="dashboard__card-info-container">
                      <span className="dashboard__card-name">
                        {ele.advisor}
                      </span>
                      <Tippy content={`Major: ${ele.major}`} animation="fade">
                        <span className="dashboard__card-major">
                          Major: {ele.major}
                        </span>
                      </Tippy>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Total Credit Earn */}
          <div className="dashboard__card flex">
            <div className="dashboard__card-info">
              <div className="dashboard__card-container flex">
                <div className="dashboard__card-icon flex bg-icon-orange">
                  <FontAwesomeIcon
                    icon={faBook}
                    className="color-icon-orange"
                  />
                </div>
                <div>
                  <span className="dashboard__card-data">
                    {takenCourses && connCourses
                      ? totalCredit(takenCourses)
                      : 0}
                  </span>
                  <span className="dashboard__card-subtitle">
                    Total Credits Earn
                  </span>
                  <span
                    className="dashboard__card-subtitle"
                    style={{ display: "block" }}
                  >
                    Credits Required: 128
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Percentage */}
          <div className="dashboard__card flex">
            <div className="dashboard__card-info">
              <div className="dashboard__card-container flex">
                <div className="dashboard__card-icon flex bg-icon-blue">
                  <FontAwesomeIcon
                    icon={faPercentage}
                    className="color-icon-blue"
                  />
                </div>
                <div>
                  <span className="dashboard__card-data">
                    {takenCourses && connCourses
                      ? ((totalCredit(takenCourses) / 128) * 100).toFixed(2)
                      : 0}
                  </span>
                  <span className="dashboard__card-subtitle">
                    Overall Percentage
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Courses */}
          <div className="dashboard__card grid-row-span-3 bg-primary">
            <div className="dashboard__card-info">
              <div className="dashboard__card-title flex">
                <div className="dashboard__card-icon flex bg-icon-purple">
                  <FontAwesomeIcon
                    icon={faTableList}
                    className="color-icon-purple"
                  />
                </div>
                Courses
              </div>
              <div className="dashboard__card-container dashboard__card-course-container">
                <CourseCardDash courseInfo={currentCourse} />
              </div>
            </div>
          </div>

          {/* Graph */}
          <div className="dashboard__card grid-col-span-3 grid-row-span-2">
            <div className="dashboard__card-info">
              <div className="dashboard__card-title">
                <span>Degree Progress</span>
              </div>
              <div className="dashboard__card-container">
                <Chart
                  userData={
                    takenCourses && advisors
                      ? degreeProgressData(takenCourses, advisors)
                      : {}
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
