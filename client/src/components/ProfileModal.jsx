/* eslint-disable react/prop-types */
// import React from 'react'
import { useSelector,useDispatch } from "react-redux"
import { setProfile} from "../utils/profileSlice";
import { Link } from "react-router-dom";

//Button component
const Button = ({name,src,profile})=>{

  const dispatch = useDispatch();

  const clickHandler = ()=>{
    dispatch(setProfile(profile))
  }
  return (
  <button onClick={clickHandler} className="flex hover:underline py-1 flex-row gap-3 items-center"><span className="w-[2em]"><img src={src} /></span><span className="text-[0.8em]">{name}</span></button>
)
}

//Modal component
const ProfileModal = ({onMouseOver,onMouseOut}) => {
  const { data } = useSelector((state) => state.account);

  console.log(data)

  console.log(data)
  return (
    <div onMouseEnter={onMouseOver} onMouseLeave={onMouseOut} className="absolute flex flex-col text-white top-[6vh] lg:top-[10vh] xl:top-[7vh] right-5 md:right-10 xl:right-[4em] z-[1] ">
       <div className="flex justify-end pr-6"><span className=""><img src='images/arrow.svg' className="w-[0.8em] -rotate-90" /></span></div>
        <div className="bg-[rgb(10,10,10)] p-4 border flex flex-col gap-2 pr-[4em] md:pr-[6em]">
            {
              data.subProfile.map((item)=> 
              item.isProfile && <Button key={item.id} name={item.name} src={item.img} profile={item} />
            )
            }
            <Link to='/ManageProfiles' className="flex hover:underline py-1 flex-row gap-3 items-center"><span className="w-[1.2em]"><img src='images/pencilSVG.svg' /></span><span className="text-[0.8em]">Manage Profiles</span></Link>
            <button className="flex hover:underline py-1 flex-row gap-3 items-center"><span className="w-[1.5em]"><img src='' /></span><span className="text-[0.8em]">Transfer Profile</span></button>
            <button className="flex hover:underline py-1 flex-row gap-3 items-center"><span className="w-[1.5em]"><img src='images/user.svg' /></span><span className="text-[0.8em]">Account</span></button>
            <button className="flex hover:underline py-1 flex-row gap-3 items-center"><span className="w-[1.5em]"><img src='images/help.svg' /></span><span className="text-[0.8em]">Help Center</span></button>
           
        </div>
        <button className="border-t-[1px] hover:underline items-center justify-center flex bg-[rgb(10,10,10)] py-4"><span className="text-[0.8em]">Sign out of Conflix</span></button>
    </div>
  )
}

export default ProfileModal