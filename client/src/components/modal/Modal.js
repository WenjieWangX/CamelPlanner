import React, { useEffect, useState } from "react";
import backend from "../../apis/backend";
import { majors } from "../../dummyData";
import { majorAdvisors } from "../../dummyData";
import "./modal.css";

import Selector from "./Selector";
import CourseSelector from "./CourseSelector";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../actions";

const Modal = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [userMajors, setUserMajors] = useState([]);
  const [userAdvisors, setUserAdvisors] = useState([]);
  const [userProgressMajorCourses, setUserProgressMajorCourses] = useState([]);
  const [userCompletedMajorCourses, setUserCompletedMajorCourses] = useState(
    []
  );
  const [pageNum, setPageNum] = useState(0);
  const [paginationButtonDisabled, setPaginationButtonDisabled] =
    useState(false);

  useEffect(() => {
    setUserAdvisors(
      userAdvisors.filter((e) => {
        return userMajors.includes(e.major);
      })
    );
  }, [userMajors]);

  const renderPage = (isPage) => {
    let pages = [
      <div className="modal__title-welcomepage" key={"welcome"}>
        <h1>Welcome To Camel Planner!</h1>
      </div>,
      <Selector
        key={"major"}
        setOpenModal={true}
        isUnique={false}
        title={"Please Select Your Major(s)"}
        setUserInfo={setUserMajors}
        userInfo={userMajors}
        data={majors}
      />,
    ];
    if (userMajors.length) {
      for (const major of userMajors) {
        pages.push(
          <Selector
            key={major + "Advisor"}
            setOpenModal={false}
            isUnique={true}
            title={`Please Select Your ${major} Major Advisor`}
            setUserInfo={setUserAdvisors}
            userInfo={userAdvisors}
            data={majorAdvisors[major]}
            major={major}
            setDisabled={setPaginationButtonDisabled}
          />
        );
        pages.push(
          <CourseSelector
            key={major + "courseprogress"}
            title={`Please Select ${major} Courses You Are Taking Right Now`}
            major={major}
            setUserInfo={setUserProgressMajorCourses}
            userInfo={userProgressMajorCourses}
          />
        );
        pages.push(
          <CourseSelector
            key={major + "coursetaken"}
            title={`Please Select ${major} Courses You Have Taken`}
            major={major}
            setUserInfo={setUserCompletedMajorCourses}
            userInfo={userCompletedMajorCourses}
            progressCourses={userProgressMajorCourses}
          />
        );
      }
    }
    pages.push(
      <div className="modal__title-welcomepage" key={"end"}>
        <h1>Thank You For Completing!</h1>
      </div>
    );
    return isPage ? pages[pageNum] : pages.length;
  };

  const renderPaginationDot = () => {
    let paginationDots = [];
    for (let i = 0; i < renderPage(false); i++) {
      paginationDots.push(
        <div key={i} className={`${i === pageNum ? "is-active" : ""}`}>
          <li></li>
        </div>
      );
    }
    return paginationDots;
  };

  const nextPage = () => {
    setPageNum(pageNum + 1);
  };

  const previousPage = () => {
    setPageNum(pageNum - 1);
  };

  const postUserData = async () => {
    setPaginationButtonDisabled(true);
    if (userAdvisors.length) {
      await backend.post("/addUserMajorAdvisor", {
        userId: user.id,
        major: userAdvisors,
        advisor: userAdvisors,
      });
    }

    if (userProgressMajorCourses.length) {
      await backend.post("/addUserCourse", {
        userId: user.id,
        courses: userProgressMajorCourses,
        status: 1,
      });
    }

    if (userCompletedMajorCourses.length) {
      await backend.post("/addUserCourse", {
        userId: user.id,
        courses: userCompletedMajorCourses,
        status: 2,
      });
    }

    await backend.put(`/updateUserStatus/${user.id}`, {
      status: "Completed",
    });

    dispatch(setUser(user.name));
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        {renderPage(true)}
        <div className="footer">
          {pageNum === 0 ? (
            ""
          ) : (
            <div
              className="modal__pagination-button pagination-left box-shadow-right"
              onClick={() => previousPage()}
              disabled={paginationButtonDisabled}
            >
              <div className="modal__pagination-button-text">Previous</div>
            </div>
          )}
          <div className="modal__pagination dot">
            <ul>{renderPaginationDot()}</ul>
          </div>
          <div
            className="modal__pagination-button pagination-right box-shadow-left"
            onClick={() =>
              renderPage(false) === pageNum + 1 ? postUserData() : nextPage()
            }
            disabled={paginationButtonDisabled}
          >
            <div className="modal__pagination-button-text">Next</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
