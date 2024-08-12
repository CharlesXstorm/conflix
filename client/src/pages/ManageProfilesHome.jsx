/* eslint-disable react/prop-types */
// import React from 'react'
import { useSelector } from "react-redux";
import IconButton from "../components/UI/IconButton";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

//motion variant
const pageVariants = {
  hidden: {
    scale: 1.5,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const ManageProfilesHome = ({ setEditClick, setAccountClick }) => {
  const { data } = useSelector((state) => state.account);

  let count = data.subProfile.length;

  return (
    <div
      
      className="absolute z-[60] flex justify-center item-center w-[100%] h-[100vh] bg-[rgb(10,10,10)] text-white overflow-hidden"
    >
      <motion.div 
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className=" flex m-[auto] flex-col justify-center">
        <p className="text-[2.2em] xl:text-[3em] text-center">
          Manage Profiles:
        </p>
        {
          //icons
          <div className="flex gap-2 md:gap-4 xl:gap-8 p-4 px-6 flex-wrap justify-center text-[rgb(120,120,120)]">
            {data.subProfile.map(() => {
              count--;
              return (
                data.subProfile[count].isProfile && (
                  <IconButton
                    key={data.subProfile[count].id}
                    name={data.subProfile[count].name}
                    src={data.subProfile[count].img}
                    edit={true}
                    profile={data.subProfile[count]}
                    setAccountClick={setAccountClick}
                    setEditClick={setEditClick}
                  />
                )
              );
            })}
          </div>
        }
        <Link
          to="/browse"
          className="bg-white text-black font-bold p-2 w-fit align-center m-[auto] px-6 mt-6 text-sm "
        >
          Done
        </Link>
      </motion.div>
    </div>
  );
};

export default ManageProfilesHome;
