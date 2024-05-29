/* eslint-disable react/prop-types */
import {useState,useEffect} from 'react'
import { useSelector } from "react-redux";
import ReactDOM from 'react-dom';
import ProfileModal from './ProfileModal';

const MovieNav = ({bgColor}) => {
  const [click,setClick] = useState(false)
  const [modal,setModal] = useState(false)
  const [timeoutId,setTimeoutId] = useState(null)
  const [style,setStyle] = useState({contWidth:'w-[10%]',inputWidth:'w-[0%]',arrow:'rotate-90'})
  // const [bgColor,setBgColor] = useState("transparent")

  const { isPC } = useSelector((state) => state.dvWidth);
  const { profile} = useSelector((state) => state.account);

useEffect(()=>{
  return ()=>{
    if(timeoutId){
      clearTimeout(timeoutId)
    }
  }
},[timeoutId])

  const clickHandler = ()=>{
    switch (click) {
        case true:
            setStyle((prev)=> ({...prev,contWidth:'w-[10%]',inputWidth:'w-[0%]'}))
            setClick(false)
            break;
        case false:
            setStyle((prev)=> ({...prev,contWidth:'w-[60%] lg:w-[55%] bg-[rgb(0,0,0,0.8)] border',inputWidth:'w-[100%]'}))
            setClick(true)
            break;
        default:
            break;
    }
  }


  const mouseOverHandler = ()=>{
    // Clear any existing timeouts
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setStyle((prev)=> ({...prev,arrow:"rotate-[270deg]"}))
    setModal(true)
  }

  const mouseOutHandler = ()=> {
    // Clear any existing timeouts
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout and save its ID
    if(isPC){
      const newTimeoutId = setTimeout(() => {
        setModal(false)
        setStyle((prev)=> ({...prev,arrow:"rotate-90"}))
      }, 1000);

      setTimeoutId(newTimeoutId);
  }else{
    setModal(false)
    setStyle((prev)=> ({...prev,arrow:"rotate-90"}))
  }

  }

  return (
    <>
    <div 
    style={{
      backgroundColor: bgColor,
      transition:"all 0.4s linear"
    }}
    className="text-white font-[roboto] fixed z-20 top-0 right-0 left-0 flex flex-row justify-between py-2 lg:py-4 px-5 md:px-10 xl:px-[4em] bg-[linear-gradient(rgb(0,0,0,0.8),rgb(0,0,0,0.4),rgb(0,0,0,0))] ">
      <div className="px-[1em] flex flex-row justify-between items-center gap-10 w-[auto] py-2 ">
        <svg
          version="1.1"
          id="conflix"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="1000px"
          // height="auto"
          viewBox="0 0 1000 287.991"
          enableBackground="new 0 0 1000 287.991"
          xmlSpace="preserve"
          className="w-[5em] xl:w-[6em]"
        >
          <g>
            <path
              fill="#ED1F24"
              d="M172.005,200.62c0.102-45.237,0.195-90.476,0.297-135.713C172.169,24.544,199.708-0.007,239.249,0
		c38.088,0.006,66.983,22.508,66.678,62.227c-0.093,43.37-0.167,86.739-0.261,130.109c0.116,40.004-28.878,63.846-67.004,67.008
		C199.626,262.582,171.65,241.058,172.005,200.62z M261.612,197.1c0.098-45.548,0.197-91.097,0.304-136.645
		c0.714-14.203-8.624-24.604-22.749-24.434c-14.31,0.173-23.489,11.011-22.861,25.311c-0.102,46.211-0.21,92.422-0.315,138.633
		c-0.786,14.202,8.483,24.515,22.752,23.358C253.031,222.165,262.028,211.574,261.612,197.1z"
            />
            <path
              fill="#ED1F24"
              d="M335.647,3.514c18.397-0.013,36.794-0.024,55.191-0.033c14.148,48.383,28.384,96.74,42.672,145.082
		c0.32-0.004,0.481-0.004,0.802-0.008c0.037-48.363,0.081-96.727,0.117-145.09c13.064-0.004,26.129-0.008,39.194-0.008
		c-0.029,80.613-0.057,161.225-0.081,241.837c-15.11,0.152-30.216,0.38-45.324,0.688c-17.651-58.834-35.231-117.689-52.674-176.586
		c-0.32,0.003-0.479,0.004-0.799,0.008c-0.087,59.404-0.173,118.809-0.258,178.213c-13.097,0.512-26.19,1.098-39.281,1.762
		C335.368,167.424,335.501,85.469,335.647,3.514z"
            />
            <path
              fill="#ED1F24"
              d="M506.418,3.456c38.793-0.003,77.585,0.012,116.378,0.032c0.017,11.621,0.031,23.242,0.047,34.863
		c-24.137-0.136-48.272-0.237-72.409-0.301c0.013,22.482,0.027,44.964,0.041,67.446c18.951,0.146,37.901,0.342,56.852,0.598
		c0.016,11.595,0.03,23.19,0.044,34.785c-18.958-0.342-37.915-0.602-56.875-0.795c0.025,35.166,0.047,70.331,0.066,105.497
		c-14.709-0.203-29.416-0.332-44.126-0.391C506.43,164.612,506.43,84.034,506.418,3.456z"
            />
            <path
              fill="#ED1F24"
              d="M643.988,3.5c14.667,0.01,29.333,0.021,44,0.032c0.138,70.611,0.274,141.223,0.417,211.834
		c24.171,1.248,48.326,2.69,72.474,4.329c0.026,12.005,0.057,24.01,0.085,36.015c-38.822-3.067-77.672-5.502-116.574-7.305
		C644.238,166.771,644.128,85.136,643.988,3.5z"
            />
            <path
              fill="#ED1F24"
              d="M781.597,3.628c14.668,0.019,29.337,0.038,44.005,0.059c0.191,85.984,0.363,171.969,0.567,257.953
		c-14.657-1.452-29.318-2.838-43.989-4.146C781.96,172.872,781.798,88.25,781.597,3.628z"
            />
            <path
              fill="#ED1F24"
              d="M897.412,133.697C881.504,90.26,865.288,46.94,848.799,3.72c15.468,0.025,30.937,0.05,46.404,0.077
		c10.022,28.964,19.926,57.968,29.711,87.013c0.319,0.014,0.481,0.021,0.801,0.035c10.199-28.942,20.297-57.919,30.284-86.936
		c13.866,0.028,27.731,0.057,41.598,0.086c-15.793,44.472-31.884,88.833-48.268,133.091c17.322,48.82,34.215,97.786,50.671,146.905
		c-15.374-2.37-30.758-4.658-46.156-6.867c-10.51-32.75-21.18-65.446-32.008-98.093c-0.318-0.027-0.476-0.039-0.794-0.066
		c-10.743,29.904-21.606,59.765-32.575,89.587c-13.835-1.646-27.676-3.229-41.526-4.742
		C864.022,220.538,880.855,177.173,897.412,133.697z"
            />
            <g>
              <path
                fill="#ED1F24"
                d="M50.228,276.55c-16.762,2.35-33.505,4.83-50.228,7.441C0,190.787,0,97.584,0,4.38
			c16.829-0.038,33.659-0.078,50.488-0.115C50.398,95.026,50.311,185.788,50.228,276.55z"
              />
              <path
                fill="#ED1F24"
                d="M139.813,4.092c-0.028,14.513-0.058,29.026-0.086,43.539C93.147,48.586,46.572,49.7,0,50.982
			C0,35.448,0,19.914,0,4.38C46.604,4.271,93.209,4.175,139.813,4.092z"
              />
              <path
                fill="#ED1F24"
                d="M139.379,221.784c-0.029,14.513-0.058,29.025-0.086,43.538C92.733,270.638,46.315,276.856,0,283.991
			c0-15.534,0-31.067,0-46.602C46.378,231.421,92.829,226.222,139.379,221.784z"
              />
            </g>
          </g>
        </svg>
        {isPC && (
          <div className="flex flex-row text-sm justify-center gap-4">
            <a className="font-bold">Home</a>
            <a className="">TV Shows</a>
            <a className="">Movies</a>
            <a className="">My List</a>
          </div>
        )}
      </div>

      {/* <div className="flex border"> */}
        <div className="flex gap-4 w-[auto] justify-end items-center ">

          {
            ////search group
            <div className={`flex gap-2 justify-start items-center p-1 transition-all duration-1 ease-in-out ${style.contWidth}`} >
            {/* <button className="flex" onClick={clickHandler}><span className="material-symbols-outlined align-center">search</span></button> */}
            <button className="flex" onClick={clickHandler}><span className='align-center w-[1.5em]'><img src='images/search.svg' /></span></button>
            <input id='search' type="search" placeholder="Title, people, genres" className={`bg-[transparent] focus:outline-none text-[rgb(150,150,150)] transition-all duration-1 ease-in-out  ${style.inputWidth}`} />
          </div>
          }

          {isPC &&
            <div className="py-1 align-center">{profile.name}</div>
          }
          <button className="py-1 align-center"><span className='align-center'><img src='images/notification.svg' className='w-[1.5em]' /></span></button>
          <div className="py-1 flex gap-[0.5em]" onMouseEnter={mouseOverHandler} onMouseLeave={mouseOutHandler} >
            <img src={profile.img} className='w-[2em]'  />
            <span className='items-center flex' ><img src="images/arrow.svg" className={`w-[0.5em] transition-all duration-500 ${style.arrow}`}  /></span>
          </div>
        </div>
      {/* </div> */}
    </div>
    
    {modal && ReactDOM.createPortal(
        <ProfileModal onMouseOver={mouseOverHandler} onMouseOut={mouseOutHandler} />,
        document.getElementById("portal")
      )}
    </>
  );
};

export default MovieNav;
