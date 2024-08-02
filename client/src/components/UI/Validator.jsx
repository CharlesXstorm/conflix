/* eslint-disable react/prop-types */

const Validator = ({ value }) => {
  return (
      
        <div className="flex p-4 bg-[orange] rounded w-[100%] items-center ">
          <span className="w-[1em] mr-1">
            <img src="/images/cancel-02.svg" />
          </span>
          <p className="text-black text-sm text-center">
            {value}
          </p>
        </div>
   
  );
};

export default Validator;
