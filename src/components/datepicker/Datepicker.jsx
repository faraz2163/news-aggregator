import React from "react";

const Datepicker = ({ label, onChange }) => {
  return (
    <div className="h-12 rounded-full flex bg-opacity-45 justify-between items-center p-5 pr-8 bg-white text-sm">
      <span className="">{label} </span>
      <input
        className="bg-transparent"
        aria-label="Date"
        type="date"
        onChange={onChange}
      />
    </div>
  );
};

export default Datepicker;
