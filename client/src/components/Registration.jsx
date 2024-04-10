// import React from 'react'

import Button from "./UI/Button";

const Registration = () => {
  return (
    <div className="border border-t-1 border-x-0 border-b-0 w-[100%] p-5 mb-[5em]">
      <div className="flex flex-col justify-center item-center m-[auto] w-[90%] md:w-[50%] mt-[2em] xl:mt-[4em]">
        <svg
          className="lg:m-[auto] w-[80%] lg:w-[50%]"
          version="1.1"
          id="Layer_2"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="724.708px"
          height="160.475px"
          viewBox="0 0 724.708 160.475"
          enableBackground="new 0 0 724.708 160.475"
          xmlSpace="preserve"
        >
          <g>
            <path
              fill="none"
              stroke="#ED1F24"
              strokeWidth="5"
              strokeMiterlimit="10"
              d="M190.091,129.727c0,5.5-4.5,10-10,10H24.909
		c-5.5,0-10-4.5-10-10V54.836c0-5.5,4.5-10,10-10h155.183c5.5,0,10,4.5,10,10V129.727z"
            />
          </g>
          <g>
            <path
              fill="none"
              stroke="#ED1F24"
              strokeWidth="5"
              strokeMiterlimit="10"
              d="M202.5,148.391c0,4.766-4.5,8.664-10,8.664h-180
		c-5.5,0-10-3.898-10-8.664s4.5-8.664,10-8.664h180C198,139.727,202.5,143.625,202.5,148.391z"
            />
          </g>
          <g>
            <path
              fill="none"
              stroke="#ED1F24"
              strokeWidth="5"
              strokeMiterlimit="10"
              d="M507.61,123.157c0,5.5-4.5,10-10,10H277.464
		c-5.5,0-10-4.5-10-10V12.5c0-5.5,4.5-10,10-10H497.61c5.5,0,10,4.5,10,10V123.157z"
            />
          </g>
          <g>
            <path
              fill="none"
              stroke="#ED1F24"
              strokeWidth="5"
              strokeMiterlimit="10"
              d="M668.923,147.975c0,5.5-4.5,10-10,10h-66.861
		c-5.5,0-10-4.5-10-10V46.806c0-5.5,4.5-10,10-10h66.861c5.5,0,10,4.5,10,10V147.975z"
            />
          </g>
          <g>
            <path
              fill="none"
              stroke="#ED1F24"
              strokeWidth="5"
              strokeMiterlimit="10"
              d="M722.208,147.975c0,5.5-4.5,10-10,10h-19.417
		c-5.5,0-10-4.5-10-10V95.712c0-5.5,4.5-10,10-10h19.417c5.5,0,10,4.5,10,10V147.975z"
            />
          </g>
          <circle
            fill="none"
            stroke="#ED1F24"
            strokeWidth="3"
            strokeMiterlimit="10"
            cx="625.493"
            cy="144.836"
            r="5.109"
          />
          <circle
            fill="none"
            stroke="#ED1F24"
            strokeWidth="3"
            strokeMiterlimit="10"
            cx="702.5"
            cy="144.836"
            r="5.109"
          />
          <line
            fill="none"
            stroke="#ED1F24"
            strokeWidth="5"
            strokeMiterlimit="10"
            x1="387.537"
            y1="133.157"
            x2="387.537"
            y2="157.975"
          />
          <line
            fill="none"
            stroke="#ED1F24"
            strokeWidth="5"
            strokeMiterlimit="10"
            x1="345.566"
            y1="157.975"
            x2="425.858"
            y2="157.975"
          />
          <line
            fill="none"
            stroke="#ED1F24"
            strokeWidth="5"
            strokeMiterlimit="10"
            x1="2.5"
            y1="147.565"
            x2="202.5"
            y2="147.565"
          />
        </svg>
        <p className="lg:text-center">STEP 1 OF 2</p>
        <p className="lg:text-center text-[2em] font-bold">
          Finish setting up your
          <br />
          account
        </p>
        <p className="lg:text-center pt-2 text-lg">
          Conflix is personalized for you.
          <br />
          Create a password to watch on any
          <br />
          device at any time.
        </p>
        <Button
          to="regform"
          name="Next"
          bgColor="bg-red-600"
          color="text-white"
          size="text-[1.4em]"
          padding="p-2"
          width="w-[100%] lg:w-[50%] mt-6 py-4 lg:py-2 xl:py-4"
          align="self-center"
          button="link"
          span={{ have: false, name: "arrow_forward_ios" }}
        />
      </div>
    </div>
  );
};

export default Registration;
