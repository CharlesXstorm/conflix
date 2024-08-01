/* eslint-disable no-redeclare */
/* eslint-disable react/prop-types */
// import React from 'react'
import { Link } from "react-router-dom";

const Button = ({
  name,
  bgColor,
  color,
  size,
  width,
  padding,
  align,
  span,
  onClick,
  button,
  className,
  to
}) => {

  return (
    <>
      {button === "link" && (
        <Link
          to={to}
          className={`rounded ${className} ${bgColor} ${color} ${size} ${width} ${align} ${padding} px-3 item-center justify-center flex`}
        >
          {name}
          {span.have && (
            <span className="material-symbols-outlined text-sm self-center pl-2">
              {span.name}
            </span>
          )}
        </Link>
      )}

      {button === "button" && (
        <button
          className={`rounded ${className} ${bgColor} ${color} ${size} ${width} ${align} ${padding} px-3 item-center flex`}
          onClick={onClick}
        >
          {name}
          {span.have && (
            <span className="material-symbols-outlined text-sm self-center pl-2">
              {span.name}
            </span>
          )}
        </button>
      )}
    </>
    // <div className={`bg-${color}-500 rounded`}>button</div>
    //
  );
};

export default Button;
