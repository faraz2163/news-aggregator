import React from "react";

const Item = ({ data: d, handleClickForItem, className }) => {
  return (
    <li
      className={`cursor-pointer text-sm hover:text-blue-600 active:text-blue-600 px-5 py-2 ${className}`}
      onClick={handleClickForItem}
    >
      {d.name}
    </li>
  );
};

export default Item;
