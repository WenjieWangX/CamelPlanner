import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./topbar.css";
import { setSelectCourses, setUser } from "../../actions";
import CAS from "../../cas/CAS";

const TopBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("wwang4");

  useEffect(() => {
    dispatch(setUser(name));
  }, []);

  useEffect(() => {
    dispatch(setSelectCourses(user.id));
  }, [user]);

  return (
    <div className="topbar menu">
      <div className="topbar__wrapper">
        <div className="topbar__left">
          <span className="topbar__title">Camel Planner</span>
        </div>
        <div
          className="topbar__right topbar__rightMargin menu-item cursor"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {/* <img
            src="https://supercharge.info/images/avatar-placeholder.png"
            alt="user phote"
            className="topbar__avatar topbar__rightMargin"
          />
          {user.name}
          <FontAwesomeIcon icon={faAngleDown} className="topbar__leftMargin" />
          {open ? (
            <ul className={"dropdown-menu"}>
              <li>
                <span className="dropdown-link">Logout</span>
              </li>
            </ul>
          ) : (
            ""
          )} */}
          {/* <CAS isOpen={open} /> */}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
