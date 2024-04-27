// import React from 'react'

const ProfileModal = () => {
  return (
    <div className="absolute flex flex-col text-white top-[6vh] lg:top-[10vh] xl:top-[7vh] right-5 md:right-10 xl:right-[4em] z-[1] ">
       <div className="flex justify-end pr-6"><span className=""><img src='images/arrow.svg' className="w-[0.8em] -rotate-90" /></span></div>
        <div className="bg-[rgb(10,10,10)] p-2 border flex flex-col gap-3 pr-[2.5em] lg">
            <div className="flex flex-row gap-2 items-center"><span><img src='' /></span><span className="text-[0.8em]">Name</span></div>
            <div className="flex flex-row gap-2 items-center"><span className="w-[1em]"><img src='images/pencilSVG.svg' /></span><span className="text-[0.8em]">Manage Profiles</span></div>
            <div className="flex flex-row gap-2 items-center"><span className="w-[1.2em]"><img src='' /></span><span className="text-[0.8em]">Transfer Profile</span></div>
            <div className="flex flex-row gap-2 items-center"><span className="w-[1.2em]"><img src='images/user.svg' /></span><span className="text-[0.8em]">Account</span></div>
            <div className="flex flex-row gap-2 items-center"><span className="w-[1.2em]"><img src='images/help.svg' /></span><span className="text-[0.8em]">Help Center</span></div>
           
        </div>
        <div className="border-t-[1px] items-center justify-center flex bg-[rgb(10,10,10)] py-4"><span className="text-[0.8em]">Sign out of Conflix</span></div>
    </div>
  )
}

export default ProfileModal