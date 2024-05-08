import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`${className} mx-auto flex max-w-7xl p-6 lg:px-8`}>
      {children}
    </div>
  );
};

export default Container;
