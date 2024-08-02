/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react'
import { useNavigate } from 'react-router-dom';

import Button from "./Button";

const Input = React.forwardRef(({ placeholder, button, style, type, align, id, onChange,value },ref) => {

  let navigate = useNavigate();

  const onClickHandler = ()=>{
    navigate('signup',{state:{email: value}})
  }

  return (
    <div
      className={`relative flex flex-col lg:flex-row  justify-center item-center m-[auto] ${align} mt-3`}
    >
      <input
        ref={ref}
        onChange={onChange}
        id={id}
        type={type}
        value={value}
        className={`justify-center gap-[1em] border rounded self-center ${style}`}
        placeholder={placeholder}
      />
      {button && (
        <Button
          name="Get Started"
          bgColor="bg-red-600"
          color="text-white"
          size="text-[1em]"
          padding="p-2"
          width="w-fit"
          align="self-center"
          button={button}
          span={{ have: true, name: "arrow_forward_ios" }}
          onClick= {onClickHandler}
        />
      )}
    </div>
  )
});

export default Input;
