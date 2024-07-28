/* eslint-disable react/prop-types */
// import { useState } from "react";
import { useSelector } from "react-redux";
import IconButton from "../components/UI/IconButton";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

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

const BrowseHome = ({
  setAccountClick,
  setEditClick,
  setAddProfile,
  setAccountLoader
}) => {
  const [guest, setGuest] = useState(false);
  const { data } = useSelector((state) => state.account);
  const navigate = useNavigate();

  let count = data.subProfile.length;

  return (
    <>
      <AnimatePresence>
        {guest.state && (
          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, type: "linear" }}
            onClick={() => setGuest(false)}
            className="text-white flex justify-center items-center absolute z-[80] left-0 top-0 w-full h-[100vh] bg-[rgb(0,0,0,0.8)] "
          >
            <motion.div
              initial={{ scale: 0.2 }}
              exit={{ scale: 0.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, type: "spring" }}
              className="flex flex-col gap-2 rounded-[6px] p-6 w-[fit-content] bg-yellow-600 "
            >
              <h1 className="font-bold lg:text-2xl">
                You&apos;re signed in as a guest
              </h1>
              <p className=" lg:text-lg ">{guest.message}</p>
              <p className=" lg:text-lg text-black mt-2">
                Do you want to signup?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/")}
                  className="bg-white text-black px-4 py-1 rounded"
                >
                  Yes
                </button>
                <button
                  onClick={() => setGuest(false)}
                  className="bg-white text-black px-4 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute z-[60] flex justify-center item-center w-[100%] h-[100vh] bg-[rgb(10,10,10)] font-[roboto] text-white overflow-hidden">
        <motion.div
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          className=" flex m-[auto] flex-col justify-center"
        >
          <p className="text-[2.2em] xl:text-[3em] text-center">
            Who&apos;s watching?
          </p>
          {
            //icons
            <div className="flex gap-2 md:gap-4 xl:gap-8 p-4 px-6 flex-wrap justify-center items-center text-[rgb(120,120,120)]">
              {data.subProfile.map((item) => {
                if (data.subProfile.length >= 6) {
                  if (item.name === "Add Profile") {
                    return;
                  }
                }
                count--;
                return (
                  <IconButton
                    key={data.subProfile[count].id}
                    name={data.subProfile[count].name}
                    src={data.subProfile[count].img}
                    edit={false}
                    profile={{ ...data.subProfile[count], userID: data._id }}
                    setAccountClick={setAccountClick}
                    setEditClick={setEditClick}
                    setAddProfile={setAddProfile}
                    setAccountLoader={setAccountLoader}
                    setGuest={setGuest}
                  />
                );
              })}
            </div>
          }
          <button
            onClick={() => {
              if (data["email"] === "guest@conflix.com") {
                setGuest({state:true,message:"Guest cannot manage profiles."});
                return;
              } else {
                navigate("/ManageProfiles");
                return;
              }
            }}
            className="border border-[rgb(120,120,120)] p-2 w-fit align-center m-[auto] px-6 mt-6 text-sm text-[rgb(120,120,120)]"
          >
            Manage Profiles
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default BrowseHome;
