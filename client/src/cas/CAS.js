import React, { useEffect, useState } from "react";
import CasClient, { constant } from "react-cas-client";
import { setUser } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import "./cas.css";

// let casEndpoint = "cas.conncoll.edu";
// let casOptions = { version: constant.CAS_VERSION_2_0 };

// let casClient = new CasClient(casEndpoint, casOptions);

// casClient
//   .auth()
//   .then((successRes) => {
//     console.log("Success");
//     console.log(successRes);
//     // Login user in state / locationStorage ()
//     // eg. loginUser(response.user);

//     // If proxy_callback_url is set, handle pgtpgtIou with Proxy Application

//     // Update current path to trim any extra params in url
//     // eg. this.props.history.replace(response.currentPath);
//   })
//   .catch((errorRes) => {
//     console.log("Error");
//     console.error(errorRes);
//     // Error handling
//     // displayErrorByType(errorRes.type)

//     // Update current path to trim any extra params in url
//     // eg. this.props.history.replace(response.currentPath);
//   });

// //Login with gateway
// let gateway = true;

// casClient
//   .auth(gateway)
//   .then((successRes) => {})
//   .catch((errorRes) => {});

// casClient.logout();

// // Apply redirect url to CAS logout url
// // You can applied redirectPath.
// // In this case, https://localhost.com/logout will be applied to logout url
// let redirectPath = "/logout";
// casClient.logout(redirectPath);
const CAS = ({ isOpen }) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  let casEndpoint = "cas.conncoll.edu";
  let casOptions = { version: constant.CAS_VERSION_2_0 };
  let casClient = new CasClient(casEndpoint, casOptions);
  useEffect(() => {
    casClient
      .auth()
      .then((successRes) => {
        setUserName(successRes.user);
        dispatch(setUser(successRes.user));
      })
      .catch((errorRes) => {
        console.error(errorRes);
      });
  }, []);

  return (
    <>
      <img
        src="https://supercharge.info/images/avatar-placeholder.png"
        alt="user phote"
        className="topbar__avatar topbar__rightMargin"
      />
      {userName}
      <FontAwesomeIcon icon={faAngleDown} className="topbar__leftMargin" />
      {isOpen ? (
        <ul className={"dropdown-menu"}>
          <li onClick={() => casClient.logout()}>
            <span className="dropdown-link">Logout</span>
          </li>
        </ul>
      ) : (
        ""
      )}
    </>
  );
};

export default CAS;
