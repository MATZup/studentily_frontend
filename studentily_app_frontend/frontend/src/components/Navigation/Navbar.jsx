import React from "react";
import ProfileField from "./ProfileField";
import { useNavigate } from "react-router-dom";

export default function Navbar({ userInformation }) {
  const navigate = useNavigate();

  const logoutHandler = () => {
    console.log("Logout Button clicked");
    localStorage.clear(); // Löscht den Token aus dem localStorage
    console.log("Token aus dem Local Storage gelöscht.");
    navigate("/login"); // Leitet zur Login-Seite weiter
  };

  return (
    <div className=" max-1350:mt-4 items-center justify-between py-6 drop-shadow">
      {userInformation && (
        <ProfileField
          userInformation={userInformation}
          logoutHandler={logoutHandler}
        />
      )}
    </div>
  );
}
