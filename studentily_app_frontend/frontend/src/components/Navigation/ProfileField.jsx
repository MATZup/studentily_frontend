import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosCall from "../utils/axiosInst";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function ProfileField({ userInformation }) {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const navigate = useNavigate();

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
    // Navigation wird zur Login-Seite ausgelöst
    navigate("/login", { replace: true });
  };

  const handleDeleteAccount = async () => {
    try {
      await axiosCall.delete("/delete-account");

      // Erfolgreich gelöscht
      localStorage.removeItem("token"); // Token aus dem Local Storage entfernen
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
    userInformation && (
      <div className="max-720:hidden flex flex-col gap-2 items-center">
        <div className="w-12 h-12 flex justify-center text-white bg-[#2E3044] font-medium items-center rounded-full">
          {nameInitialsFn(userInformation.username)}
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm mb-1 font-medium">{userInformation.username}</p>
          <div className="flex flex-col ">
            {isDeleteMode ? (
              <button
                className="text-[.7rem] bg-slate-100 h-[1.2rem] w-[6.5rem] rounded-full hover:text-white hover:bg-[#e35c55] mt-[.3rem]"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            ) : (
              <button
                className="text-[.7rem] bg-slate-100 h-[1.2rem] w-[3.6rem] rounded-full hover:text-white hover:bg-[#e35c55] mt-[.3rem]"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
          <div className="flex flex-col">
            <button className="text-gray-500 mt-[.4rem]" onClick={toggleMode}>
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
    )
  );
}
