import React from "react";

const Card = ({ children, ...props }) => {
  return (
    <div className={`bg-white rounded-3xl ${props.className}`}>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Card;
