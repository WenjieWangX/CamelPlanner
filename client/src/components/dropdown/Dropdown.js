import React from "react";
import Select from "react-select";
import "./dropdown.css";

const Dropdown = ({ options, onChange }) => {
  return <Select options={options} onChange={onChange} className="Dropdown" />;
};

export default Dropdown;
