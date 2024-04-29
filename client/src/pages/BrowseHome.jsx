/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import IconButton from "../components/UI/IconButton";
import { Link } from "react-router-dom";


const BrowseHome = ({ setAccountClick,setEditClick}) => {

  const {data} = useSelector((state)=> state.account)

  return (
    <div className="absolute z-10 flex justify-center item-center w-[100%] h-[100vh] bg-[rgb(10,10,10)] font-[roboto] text-white">
      <div className=" flex m-[auto] flex-col justify-center">
        <p className="text-[2.2em] xl:text-[3em] text-center">
          Who&apos;s watching?
        </p>
        {
          //icons
          <div className="flex gap-2 xl:gap-8 p-4 px-6 flex-wrap justify-center text-[rgb(120,120,120)]">
            {data.subProfile.map((item) => (
              <IconButton
                key={item.id}
                name={item.name}
                src={item.img}
                edit={false}
                profile={item}
                setAccountClick={setAccountClick}
                setEditClick={setEditClick}
              />
            ))}
          </div>
        }
        <Link
          to="/ManageProfiles"
          className="border border-[rgb(120,120,120)] p-2 w-fit align-center m-[auto] px-6 mt-6 text-sm text-[rgb(120,120,120)]"
        >
          Manage Profiles
        </Link>
      </div>
    </div>
  );
};

export default BrowseHome;
