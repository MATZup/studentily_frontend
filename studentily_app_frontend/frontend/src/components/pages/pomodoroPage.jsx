import React from "react";
import { useState } from "react";
import PomodoroTimer from "../pomodoroTimer/pomodoroTimer";
import UnitPage from "../pomodoroTimer/unitPage";
import UnitContext from "../pomodoroTimer/unitContext";
import PomodoroBg from "../pomodoroTimer/pomodoroBg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Sidebar/Sidebar";

export default function pomodoroPage() {
  const [displayUnitPage, setDisplayUnitPage] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="absolute left-0 top-0 p-8">
        <FontAwesomeIcon
          onClick={() => navigate("/")}
          className="w-[2.1rem] h-[2.1rem] cursor-pointer"
          icon={faArrowLeft}
        />
      </div>

      <button
        className="fixed z-[800] outline-none min-1350:hidden top-4 right-4 m-2 p-2 bg-gray-800 text-white rounded-full"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon
          icon={faBars}
          className={`transition-transform duration-300 ${
            isSidebarOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col h-[100vh] justify-center items-center">
        <h1 className="absolute mt-6 top-0 left-1/2 transform -translate-x-1/2 w-[11.1rem] font-bold pb-1 flex items-center justify-center border-b border-gray-300 mb-12">
          Pomodoro
        </h1>
        <UnitContext.Provider
          value={{
            displayUnitPage,
            setDisplayUnitPage,
            workMinutes: workMinutes,
            breakMinutes: breakMinutes,
            setWorkMinutes,
            setBreakMinutes,
          }}
        >
          {displayUnitPage ? <UnitPage /> : <PomodoroTimer />}
        </UnitContext.Provider>
      </div>
      <PomodoroBg />
    </>
  );
}
