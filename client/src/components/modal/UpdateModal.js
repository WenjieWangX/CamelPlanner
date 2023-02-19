import React, { useState } from "react";
import backend from "../../apis/backend";
import { majors } from "../../dummyData";
import { majorAdvisors } from "../../dummyData";
import "./modal.css";
import { useSelector, useDispatch } from "react-redux";
import { setAdvisor } from "../../actions";

import Dropdown from "../../components/dropdown/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const UpdateModal = ({ handleInfoChange }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const infos = useSelector((state) => state.advisors);
  const [updateObj, setUpdateObj] = useState("");
  const [major, setMajor] = useState("");
  const [advisor, setAdvisors] = useState("");
  const [dataId, setDataId] = useState("");
  const [decision, setDecision] = useState("");

  const options = [
    { value: "major", label: "Major" },
    { value: "advisor", label: "Advisor" },
  ];

  const dispatchChanges = async (type) => {
    if (type === "addUserMajorAdvisor") {
      const userAdvisors = [{ value: advisor, major: major }];
      await backend.post("/addUserMajorAdvisor", {
        userId: user.id,
        major: userAdvisors,
        advisor: userAdvisors,
      });
      dispatch(setAdvisor(user.id));
    } else if (type === "changeAdvisor") {
      await backend.put(`/updateAdvisor/${dataId}`, {
        advisor: advisor,
      });
      dispatch(setAdvisor(user.id));
    } else if (type === "deleteUserMajorAdvisor") {
      await backend.delete(`/deleteMajor/${dataId}`);
      dispatch(setAdvisor(user.id));
    }
    handleInfoChange(false);
  };

  const handleUpdateObjChange = (event) => {
    setUpdateObj(event.value);
    setMajor("");
    setAdvisors("");
    setDataId("");
    setDecision("");
  };

  const handleStudentMajorChange = (event) => {
    setMajor(event.value);
    setDataId(event.id);
  };

  const handleConnMajorChange = (event) => {
    setMajor(event.value);
  };

  const handleAdvisorChange = (event) => {
    setAdvisors(event.value);
  };

  const handleDecisionChange = (event) => {
    setDecision(event.value);
  };

  const getOptions = (type) => {
    let output = [];
    if (type === "student-majors") {
      for (const value of Object.values(infos)) {
        const option = { value: value.major, label: value.major, id: value.id };
        output.push(option);
      }
    } else if (type === "advisors") {
      for (const value of majorAdvisors[major]) {
        const option = { value: value, label: value };
        output.push(option);
      }
    } else if (type === "decision") {
      output.push({ value: "delete", label: "Delete Major" });
      output.push({ value: "add", label: "Add Major" });
    } else if (type === "conn-majors") {
      for (const value of majors) {
        if (value !== "Computer Science" && value !== "Mathematics") {
          continue;
        }
        const option = { value: value, label: value };
        output.push(option);
      }
    }
    return output;
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="modal__title-majorpage">
          <h1>Change Major/Advisor</h1>
          <FontAwesomeIcon
            icon={faX}
            onClick={() => handleInfoChange(false)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <>
          <label htmlFor="information-update">
            Choose Which Information You Want to Update
          </label>
          <Dropdown
            id="information-update"
            options={options}
            onChange={handleUpdateObjChange}
          />
        </>
        {updateObj === "advisor" ? (
          <>
            <>
              <label htmlFor="student-majors">Major</label>
              <Dropdown
                id="student-majors"
                options={getOptions("student-majors")}
                onChange={handleStudentMajorChange}
              />
            </>
            {major !== "" ? (
              <>
                <label htmlFor="student-major-advisors">Advisor</label>
                <Dropdown
                  id="student-major-advisors"
                  options={getOptions("advisors")}
                  onChange={handleAdvisorChange}
                />
                {advisor !== "" ? (
                  <div className="footer">
                    <div
                      className="modal__pagination-button pagination-right box-shadow-left"
                      onClick={() => dispatchChanges("changeAdvisor")}
                    >
                      <div className="modal__pagination-button-text">
                        Update Advisor Submit
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </>
        ) : updateObj === "major" ? (
          <>
            <>
              <label htmlFor="major-decision">Update Type</label>
              <Dropdown
                id="major-decision"
                options={getOptions("decision")}
                onChange={handleDecisionChange}
              />
            </>
            {decision !== "" ? (
              decision === "delete" ? (
                <>
                  <label htmlFor="student-major-delete">Major</label>
                  <Dropdown
                    id="student-major-delete"
                    options={getOptions("student-majors")}
                    onChange={handleStudentMajorChange}
                  />
                  {major !== "" ? (
                    <div className="footer">
                      <div
                        className="modal__pagination-button pagination-right box-shadow-left"
                        onClick={() =>
                          dispatchChanges("deleteUserMajorAdvisor")
                        }
                      >
                        <div className="modal__pagination-button-text">
                          Delete Major Submit
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ) : decision === "add" ? (
                <>
                  <label htmlFor="conn-major-add">Major</label>
                  <Dropdown
                    id="conn-major-add"
                    options={getOptions("conn-majors")}
                    onChange={handleConnMajorChange}
                  />
                  {major !== "" ? (
                    <>
                      <label htmlFor="conn-major-advisor">Adivsor</label>
                      <Dropdown
                        id="conn-major-advisor"
                        options={getOptions("advisors")}
                        onChange={handleAdvisorChange}
                      />
                      {advisor !== "" ? (
                        <div className="footer">
                          <div
                            className="modal__pagination-button pagination-right box-shadow-left"
                            onClick={() =>
                              dispatchChanges("addUserMajorAdvisor")
                            }
                          >
                            <div className="modal__pagination-button-text">
                              Add Major Submit
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UpdateModal;
