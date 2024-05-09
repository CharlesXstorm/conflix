/* eslint-disable react/prop-types */
// import React from 'react'
import { useSelector } from "react-redux";

const ItemModal = ({ onMouseOut }) => {
  const { itemInfo } = useSelector((state) => state.item);

  console.log(itemInfo);
  return (
    <div className="h-[100%] w-[100%] fixed top-0 left-0 z-[20] border-4 border-green-500">
      <div onClick={onMouseOut}  className="w-[inherit] h-[inherit] absolute top-0 left-0 border-4 border-blue-500"></div>
      <div
        onMouseOut={onMouseOut}
        className={`absolute bg-red-500 border p-[100px] ${itemInfo.top} ${itemInfo.left}`}
      ></div>
    </div>
  );
};

export default ItemModal;
