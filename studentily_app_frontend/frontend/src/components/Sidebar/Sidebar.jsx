import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axiosCall from "../utils/axiosInst";
import uniSmiley from "../images/emoji_icons/uni_smiley.png";
import notesIcon from "../images/notes_icon.png";
import pomodoroIcon from "../images/pomodoro_icon.png";
import todosIcon from "../images/todos_icon.png";
import journalIcon from "../images/journal_icon.png";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [userInformation, setUserInformation] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInformation = async () => {
      try {
        const response = await axiosCall.get("/get-user");
        if (response.data && response.data.user) {
          setUserInformation(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    getUserInformation();
  }, []);

  const nameInitialsFn = (username) => {
    if (!username) return "";

    const firstAndLastName = username.split(" ");
    let nameInitials = "";

    for (let i = 0; i < Math.min(firstAndLastName.length, 2); i++) {
      nameInitials += firstAndLastName[i][0];
    }
    return nameInitials.toUpperCase();
  };

  const handleLogout = () => {
    navigate("/login", { replace: true });
  };

  const handleDeleteAccount = async () => {
    try {
      await axiosCall.delete("/delete-account");
      localStorage.removeItem("token");
      handleLogout();
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("There was an error deleting your account. Please try again.");
    }
  };

  const toggleMode = () => {
    setIsDeleteMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`fixed z-[700] top-0 right-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 mb-[3rem] mt-[1rem]">
        {userInformation && (
          <div className="flex flex-col gap-2 items-center">
            <div className="w-12 h-12 flex justify-center text-white bg-[#2E3044] font-medium items-center rounded-full">
              {nameInitialsFn(userInformation.username)}
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm mb-1 font-medium">
                {userInformation.username}
              </p>
              <div className="flex flex-col ">
                {isDeleteMode ? (
                  <button
                    className="text-[.7rem] text-black bg-slate-100 h-[1.2rem] w-[6.5rem] rounded-full hover:text-white hover:bg-[#e35c55] mt-[.3rem]"
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </button>
                ) : (
                  <button
                    className="text-[.7rem] text-black bg-slate-100 h-[1.2rem] w-[3.6rem] rounded-full hover:text-white hover:bg-[#e35c55] mt-[.3rem]"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
              </div>
              <div className="flex flex-col">
                <button
                  className="text-gray-500 mt-[.4rem]"
                  onClick={toggleMode}
                >
                  {isDeleteMode ? (
                    <FontAwesomeIcon
                      icon={faArrowRightArrowLeft}
                      className="text-base transform transition-transform duration-360 text-slate-400"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faArrowRightArrowLeft}
                      className="text-base transform transition-transform duration-360 -rotate-180 text-slate-500"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4">

<span className="cursor-pointer" onClick={() => navigate("/")}>
          <div className="flex flex-col items-center">
            <img
              className="w-[1.7rem] hover:rotate-12 transition-all mb-[.3rem]"
              src={uniSmiley}
              alt=""
            />
            <span className="text-sm">Notes</span>
          </div>
        </span>
        
        <span className="cursor-pointer" onClick={() => navigate("/notes")}>
          <div className="flex flex-col items-center">
            <img
              className="w-[1.7rem] hover:rotate-12 transition-all mb-[.3rem]"
              src={notesIcon}
              alt=""
            />
            <span className="text-sm">Notes</span>
          </div>
        </span>
        <span className="cursor-pointer" onClick={() => navigate("/pomodoro")}>
          <div className="flex flex-col items-center">
            <img
              className="w-[1.9rem] hover:rotate-12 transition-all mb-[.3rem]"
              src={pomodoroIcon}
              alt=""
            />
            <span className="text-sm">Pomodoro</span>
          </div>
        </span>
        <span className="cursor-pointer" onClick={() => navigate("/todos")}>
          <div className="flex flex-col items-center">
            <img
              className="w-[1.9rem] hover:rotate-12 transition-all mb-[.3rem]"
              src={todosIcon}
              alt=""
            />
            <span className="text-sm">Todos</span>
          </div>
        </span>
        <span className="cursor-pointer" onClick={() => navigate("/journal")}>
          <div className="flex flex-col items-center">
            <img
              className="w-[1.7rem] hover:rotate-12 transition-all mb-[.3rem]"
              src={journalIcon}
              alt=""
            />
            <span className="text-sm">Journal</span>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
