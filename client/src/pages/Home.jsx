/* eslint-disable react/jsx-key */
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWidth } from "../utils/dvWidthSlice.js";

import HomeDetail from "../components/HomeDetail";
import HomeNav from "../components/HomeNav";
import Input from "../components/UI/Input";
import Accordion from "../components/UI/Accordion.jsx";
import Footer from "../components/Footer.jsx";

const details = [
  {
    id: 1,
    title: "Enjoy on your TV",
    desc: "Watch on smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blue-ray players, and more",
    src: "/images/tv.png"
  },
  {
    id: 2,
    title: "Download your shows to watch offline",
    desc: "Save your favourites easily and always have something to watch",
    src: "/images/mobile.jpg"
  },
  {
    id: 3,
    title: "Create profile for kids",
    desc: "Send kids on adventures with their favourite characters in a space made just for them - free with your membership",
    src: "/images/kids.png"
  }
];

const accordion = [
  {
    id: 0,
    header: "What is Conflix?",
    body: (
      <>
        Conflix is a streaming service that offers a wide variety of
        award-winning TV shows, movies, anime, documentaries, and more on
        thousands of internet-connected devices.
        <br />
        <br />
        You can watch as much as you want, whenever you want without a single
        commercial – all for one low monthly price. There&apos;s always
        something new to discover and new TV shows and movies are added every
        week!
      </>
    )
  },
  {
    id: 1,
    header: "How much does Conflix cost?",
    body: (
      <>
        Watch Conflix on your smartphone, tablet, Smart TV, laptop, or streaming
        device, all for one fixed monthly fee. Plans range from ₦1,600 to ₦5,000
        a month. No extra costs, no contracts.
      </>
    )
  },
  {
    id: 2,
    header: "Where can I watch?",
    body: (
      <>
        Watch anywhere, anytime. Sign in with your Conflix account to watch
        instantly on the web at conflix.netlify.app from your personal computer
        or on any internet-connected device that offers the Conflix app,
        including smart TVs, smartphones, tablets, streaming media players and
        game consoles.
        <br />
        <br />
        You can also download your favorite shows with the iOS, Android, or
        Windows 10 app. Use downloads to watch while you&apos;re on the go and
        without an internet connection. Take Conflix with you anywhere.
      </>
    )
  },
  {
    id: 3,
    header: "How do I cancel?",
    body: (
      <>
        Conflix is flexible. There are no pesky contracts and no commitments.
        You can easily cancel your account online in two clicks. There are no
        cancellation fees – start or stop your account anytime.
      </>
    )
  },
  {
    id: 4,
    header: "What can I watch on Conflix?",
    body: (
      <>
        Conflix has an extensive library of feature films, documentaries, TV
        shows, anime, award-winning Conflix originals, and more. Watch as much
        as you want, anytime you want.
      </>
    )
  },
  {
    id: 5,
    header: "Is Conflix good for kids?",
    body: (
      <>
        The Conflix Kids experience is included in your membership to give
        parents control while kids enjoy family-friendly TV shows and movies in
        their own space.
        <br />
        <br />
        Kids profiles come with PIN-protected parental controls that let you
        restrict the maturity rating of content kids can watch and block
        specific titles you don’t want kids to see.
      </>
    )
  }
];

const Home = () => {
  const [clickedId, setClickedId] = useState(null);
  const { isMobile, isTablet } = useSelector((state) => state.dvWidth);
  const dispatch = useDispatch();

  const handleEvent = () => {
    dispatch(getWidth(window.innerWidth));
  };

  const isOdd = (item) => !(item.id % 2 == 0);

  useEffect(() => {
    window.addEventListener("load", handleEvent);
    window.addEventListener("resize", handleEvent);

    return () => {
      window.addEventListener("load", handleEvent);
      window.addEventListener("resize", handleEvent);
    };
  }, []);

  return (
    <>
      <div className="font-[roboto] bg-[url('/images/bkimgMB.jpg')] relative border-[rgb(25,25,25)] border-x-0 border-t-0 border-b-[0.5em] lg:bg-[url('/images/bkimgPC.jpg')] bg-cover w-[100%] h-[content] lg:h-[90vh] margin-auto pb-[2em] ">
        <div className="w-full h-full absolute bg-[rgb(0,0,0,0.4)] top-0 left-0"></div>
        <HomeNav
          button="link"
          to="/login"
          buttonColor="bg-red-600"
          buttonText="text-white"
          size="text-md"
        />
        <div className="mt-[2.5em] md:mt-[6em] xl:mt-[10em] font-[roboto] w-[80%] m-[auto] z-1 relative">
          <p className="text-white font-bold text-[1.8em] xl:text-[3em] text-center tracking-normal">
            Unlimited movies, TV shows, and more{" "}
          </p>
          <p className="text-white xl:text-[1.5em] text-center  tracking-normal p-[1em]">
            Watch anywhere. Cancel anytime{" "}
          </p>
          <p className="text-white xl:text-[1.5em] text-center  tracking-normal p-[1em]">
            Ready to watch? Enter your email to create or restart your
            membership{" "}
          </p>
        </div>
        <Input
          type="text"
          button="button"
          placeholder="Email address"
          style="bg-[rgb(55,65,81,0.5)] border-[rgb(255,255,255,0.5)] text-white p-2 px-4 lg:p-2 md:w-[50%] lg:w-[30%] xl:w-[20%]"
          align="justify-center gap-[1em] px-[4em] lg:gap-[0.2em]"
        />
      </div>

      {
        //first div
      }
      {details.map((item) => (
        <HomeDetail
          key={item.id}
          title={item.title}
          src={item.src}
          desc={item.desc}
          isOdd={isOdd(item)}
          isMobile={isMobile}
          isTablet={isTablet}
          // isOdd={item.isOdd}
        />
      ))}

      {
        //frequently asked questions
        <div className="flex flex-col items-center justify-center mt-[2em] lg:mt-[4em]">
          <p className="text-white text-[2em] xl:text-[3em] text-center font-bold py-3 pt-4 lg:pt-0">
            Frequently Asked Questions
          </p>
          {
            //accordion list
            accordion.map((item) => (
              <Accordion
                key={item.id}
                header={item.header}
                body={item.body}
                id={item.id}
                clickedId={clickedId}
                setClickedId={setClickedId}
              />
            ))
          }

          {
            //get started
            <div className="w-[100%] margin-auto pb-[2em] lg:pb-[3em] ">
              <div className="mt-[2em] font-[roboto] w-[80%] m-[auto]">
                <p className="text-white xl:text-[1.5em] text-center  tracking-normal p-[1em]">
                  Ready to watch? Enter your email to create or restart your
                  membership{" "}
                </p>
              </div>
              <Input
                type="text"
                button="button"
                placeholder="Email address"
                style="bg-[rgb(55,65,81,0.5)] border-[rgb(255,255,255,0.5)] text-white p-2 px-4 lg:p-2 md:w-[50%] lg:w-[30%] xl:w-[20%]"
                align="justify-center gap-[1em] px-[4em] lg:gap-[0.2em]"
              />
            </div>
          }
          {
            //footer
            <Footer border="border-t-[0.5em]" />
          }
        </div>
      }
    </>
  );
};

export default Home;
