import React from "react";
import { deleteCourse } from "../../actions";
import "./scheduleblock.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import backend from "../../apis/backend";

const ScheduleBlock = ({ courseInfo, dispatch, courseNum }) => {
  const removeClass = (id, courseId) => {
    backend.delete(`/delete/${courseId}`).then((response) => {
      dispatch(deleteCourse(id));
    });
  };

  const renderedCourseBlock = () => {
    let courseBlocks = [];
    for (let i = 0; i < courseInfo.time.length; i++) {
      const currentTime = courseInfo.modifyTime[i];
      const currentDate = courseInfo.modifyDate[i];
      for (let j = 0; j < currentDate.length; j++) {
        const startTimeDate = currentDate[j] + "-" + currentTime[0];
        const endTimeDate = currentDate[j] + "-" + currentTime[1];
        courseBlocks.push(
          <div
            key={i.toString() + j.toString()}
            className={`schedule-block bg-color-${courseNum}`}
            style={{
              gridArea: `${startTimeDate} / ${endTimeDate}`,
              gridRow: `${startTimeDate} / ${endTimeDate}`,
            }}
          >
            <FontAwesomeIcon
              icon={faX}
              className="remove-class"
              onClick={() => removeClass(courseInfo.id, courseInfo.courseId)}
            />
            <div className="coursecard__content">
              <div className="coursecard__title">{courseInfo.deptCode}</div>
              <div className="coursecard__instrutor">
                {courseInfo.instructor ? courseInfo.instructor : "TBD"}
              </div>
              <div className="coursecard__time">
                {courseInfo.date[i]}: {courseInfo.time[i]}
              </div>
            </div>
          </div>
        );
      }
    }
    return <>{courseBlocks}</>;
  };
  return <>{renderedCourseBlock()}</>;
};

export default ScheduleBlock;
