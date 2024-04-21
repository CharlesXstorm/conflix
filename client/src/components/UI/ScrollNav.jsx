import {useRef,useState} from 'react'
import { useSelector } from 'react-redux';

//next button
const Next = () => {
  return (
    <div className="border absolute z-10 top-0 right-0 border-red-500 h-[inherit]">
      <button className="w-[3em] xl:w-[5em] h-[100%] border">next</button>
    </div>
  );
};

//previous button
const Prev = () => {
  return (
    <div className="border absolute z-10 top-0 left-0 border-red-500 h-[inherit]">
      <button className="w-[3em] xl:w-[5em] h-[100%] border">prev</button>
    </div>
  );
};

//scroll items
const ScrollItem = ({src,bg}) => {
  return (
    <div className="relative h-[100%] bg-[orange] border border-green-500 flex-none w-[calc(100%/2)] md:w-[calc(100%/4)] lg:w-[calc((100%/6)-1%)]">
      <div className="absolute top-[10px] left-[10px]">
        <img src={src} className="w-[5%]" />
      </div>
      <div className="relative flex justify-center font-bold text-[5em] border items-center h-[inherit]">{bg}</div>
    </div>
  );
};

//data
const genre = [
  {
    _id: 0,
    title: "Tv Shows",
    movies: [
      {
        id: 0,
        logo: "images/LOGO_C.svg",
        bg: "0"
      },
      {
        id: 1,
        logo: "images/LOGO_C.svg",
        bg: "1"
      },
      {
        id: 2,
        logo: "images/LOGO_C.svg",
        bg: "2"
      },
      {
        id: 3,
        logo: "images/LOGO_C.svg",
        bg: "3"
      },
      {
        id: 4,
        logo: "images/LOGO_C.svg",
        bg: "4"
      },
      {
        id: 5,
        logo: "images/LOGO_C.svg",
        bg: "5"
      },
      {
        id: 6,
        logo: "images/LOGO_C.svg",
        bg: "6"
      },
      
    ]
  }
];

//scroll component
const ScrollNav = () => {
    const [list,setList] = useState([...genre[0].movies])
    const scrollRef = useRef()
    const {dvWidth} = useSelector((state)=> state.dvWidth)

    const scrollHandler = ()=>{
        var lastChild = ((scrollRef.current.lastChild.getBoundingClientRect().right)*1)-1
        var firstChild = ((scrollRef.current.firstChild.getBoundingClientRect().left)*1)+1

        

        console.log(lastChild)
        console.log( lastChild < ( dvWidth*1)?"reached lastChild":"" ,dvWidth)

        console.log(firstChild)
        console.log( firstChild > 0?"reached firstChild":"" ,dvWidth)
       
    }

  return (
    <>
      <p className="mb-2 font-bold px-5 md:px-10 xl:px-[4em] lg:text-xl">
        {genre[0].title}
      </p>

      <div className="border relative h-[8em] lg:h-[6em] xl:h-[8em]">
        <Next />
        <Prev />

        <div ref={scrollRef} onScroll={scrollHandler} id="scrollNav" className="flex relative flex-row gap-[1%] h-[100%] w-[auto] w-[100%] overflow-scroll">
          
          {
          list.map((item)=> <ScrollItem key={item.id} src={item.logo} bg={item.bg} />)
          }
        </div>
      </div>
    </>
  );
};

export default ScrollNav;
