import React, { useState, useEffect } from "react";
import uniSmiley from "../images/emoji_icons/uni_smiley.png";
import watchIcon from "../images/watch_header_section.png";
import axiosCall from "../utils/axiosInst";
import Navbar from "../Navigation/Navbar";

export default function HeaderSection() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userInformation, setUserInformation] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 786);

  // Interval, um die Uhrzeit aktuell sichtbar zu machen
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Daten des Benutzers abrufen
  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await axiosCall.get("/get-user");
        setUserInformation(response.data.user);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInformation();
  }, []);

  // Bildschirmgröße überwachen
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 786);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      id="headerWrapper"
      className="max-500:mt-10 max-767:px-8 flex max-1350:items-center max-1350:justify-center max-786:mt-12 z-50 max-1005:gap-14 max-1005:justify-start justify-between pt-[5rem]"
    >
      <div className="flex max-720:relative max-720:left-0 flex-col items-start">
        <h1 className="max-500:text-[21px] max-550:mr-0 max-767:w-full max-767:mr-[9.5rem] max-767:mt-[.5rem] between-721-767:mt-[1.5rem] between-768-787:mr-[22.9rem] between-786-970:mt-[3rem] between-786-970:mr-[9.7rem] between-970-1005:mt-[2.8rem] between-970-1005:mr-[15.9rem] between-1005-1200:mt-[2.5rem] between-1005-1200:mr-[16.1rem] between-1200-1350:mt-[3rem] between-1200-1350:mr-[21.9rem] max-767:text-[1.5rem] relative mb-1 text-left max-786:flex-col font-bold flex">
          Hey, let's rock your&nbsp;
          <span className="break-word">
            studies, {""}
            {isSmallScreen && userInformation && (
              <span>{userInformation.username.split(" ")[0]}!</span>
            )}
          </span>
          <img
            className="max-500:-top-[3.8rem] max-500:-left-[1.2rem] max-500:w-[5.1rem] max-500:h-[4.1rem] max-767:-mt-[.55rem] max-767:w-[5.5rem] max-767:h-[4.4rem] max-786:absolute max-786:-left-5 max-786:-top-16 w-24 h-[4.8rem] -mt-3"
            src={uniSmiley}
            alt="App Smiley"
          />
        </h1>
        {!isSmallScreen && (
          <span className="max-500:text-[21px] text-[28px] font-bold -mt-7">
            {userInformation && (
              <span>{userInformation.username.split(" ")[0]}!</span>
            )}
          </span>
        )}
      </div>
      <div className="max-1350:hidden max-1350:gap-20 max-1350:-mt-[4.5rem] max-1350:-mr-12 items-center -mt-7 -mr-3">
        <div
          id="dayAndTime"
          className="max-1200:hidden flex flex-col items-center"
        >
          <h2 className="font-bold">
            <span className="font-bold text-[14px]">
              {currentTime.toLocaleDateString()}
            </span>
            <p>
              {currentTime.toLocaleDateString(undefined, { weekday: "long" })}
            </p>
            <p className="border-b-[.8px] pt-1 w-[7.2rem] border-black border-solid border-opacity-50"></p>
          </h2>
          <div
            id="time_wrapper"
            className="pt-2 flex items-center justify-center"
          >
            <img className="w-[.8rem] mr-[.2rem]" src={watchIcon} alt="" />
            <span id="time" className="text-[14px] mb-[.6px] font-bold">
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
        <Navbar userInformation={userInformation} />
      </div>
    </div>
  );
}
