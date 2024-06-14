// import React from 'react'

const AboutItem = () => {
  return (
    <p className="text-sm lg">
      <span className="text-[rgb(120,120,120)]">Creator:</span> Lorem ipsum
      dolor sit amet
    </p>
  );
};

const AboutMovie = () => {
  return (
    <div className="text-white flex flex-col gap-1 mt-5">
      <p className="text-xl mb-2 font-bold">About Dark</p>
      <AboutItem />
      <AboutItem />
      <AboutItem />
      <AboutItem />
      <AboutItem />
    </div>
  );
};

export default AboutMovie;
