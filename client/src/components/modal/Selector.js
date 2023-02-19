import React, { useEffect } from "react";

import DataButton from "./DataButton";

const Selector = ({
  setOpenModal,
  isUnique,
  title,
  userInfo,
  setUserInfo,
  data,
  major,
  setDisabled,
}) => {
  useEffect(() => {
    if (isUnique && userInfo.length) {
      setDisabled(false);
    } else if (isUnique && !userInfo.length) {
      setDisabled(true);
    }
  }, [userInfo]);
  const renderDataButton = () => {
    let dataButton = [];
    for (const value of data) {
      if (
        value !== "Computer Science" &&
        value !== "Mathematics" &&
        setOpenModal === true
      ) {
        continue;
      }
      dataButton.push(
        <DataButton
          key={value}
          isFullWidth={false}
          isUnique={isUnique}
          value={value}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          major={major}
        />
      );
    }

    return dataButton;
  };

  return (
    <>
      <div className="modal__title-majorpage">
        <h1>{title}</h1>
      </div>
      <div className="modal__button-container">
        {data ? renderDataButton() : ""}
      </div>
    </>
  );
};

export default Selector;
