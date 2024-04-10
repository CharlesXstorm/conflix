/* eslint-disable react/prop-types */

const HomeDetail = ({ isOdd, title, desc, src, isMobile, isTablet }) => {
  return (
    <div className="flex flex-col lg:flex-row p-5 lg:px-[5em] lg:mt-[2em] xl:mt-[4em] justify-center items-center border-[rgb(25,25,25)] border-b-[0.5em]">
      {!isOdd && (
        <div className="hidden lg:flex lg:w-[40%]">
          <img src={src} />
        </div>
      )}
      <div className="self-center text-center lg:text-left w-[90%] lg:w-[40%]">
        <p className="text-white text-[2em] xl:text-[3em] font-bold py-3 pt-4 lg:pt-0">
          {title}
        </p>
        <p className="text-white xl:text-[1.2em] ">{desc}</p>
      </div>
      {(isOdd || isMobile || isTablet) && (
        <div className="lg:w-[40%]">
          <img src={src} />
        </div>
      )}
    </div>
  );
};

export default HomeDetail;
