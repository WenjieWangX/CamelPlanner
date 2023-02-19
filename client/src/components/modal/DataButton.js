import React from "react";

const DataButton = ({
  isFullWidth,
  isUnique,
  value,
  userInfo,
  setUserInfo,
  major,
}) => {
  const updateUserInfo = () => {
    if (
      isUnique &&
      userInfo.some((element) => {
        return element["major"] === major;
      })
    ) {
      setUserInfo(
        userInfo.filter((val) => {
          return val.major !== major;
        })
      );
    } else if (
      isUnique &&
      !userInfo.find((element) => {
        return element["major"] === major;
      })
    ) {
      setUserInfo([...userInfo, { major: major, value: value }]);
    } else if (userInfo.includes(value)) {
      setUserInfo(
        userInfo.filter((e) => {
          return e !== value;
        })
      );
    } else {
      setUserInfo([...userInfo, value]);
    }
  };
  return (
    <>
      <button
        key={value}
        className={`modal__button-selector ${
          isUnique &&
          userInfo.some((element) => {
            return element["value"] === value;
          })
            ? "selected"
            : isUnique &&
              !userInfo.some((element) => {
                return element["value"] === value;
              })
            ? ""
            : userInfo.includes(value)
            ? "selected"
            : ""
        } ${isFullWidth ? "full-width" : ""} ${
          isUnique &&
          userInfo.some((element) => {
            return element["major"] === major && element["value"] !== value;
          })
            ? ""
            : "button-animation"
        }`}
        onClick={() => updateUserInfo()}
        disabled={
          isUnique &&
          userInfo.some((element) => {
            return element["major"] === major;
          }) &&
          userInfo.some((element) => {
            return element["major"] === major && element["value"] !== value;
          })
            ? true
            : false
        }
      >
        <div className="modal__button-selector-text">{value}</div>
      </button>
    </>
  );
};

export default DataButton;
