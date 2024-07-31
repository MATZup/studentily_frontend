import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import HeaderSection from "../home/headerSection";
import ProductivityCards from "../home/productivityCards";
import BgElements from "../home/bgElements";
import Sidebar from "../Sidebar/Sidebar";
import axiosCall from "../utils/axiosInst";

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <button
        tabindex="0" className="fixed z-[800] outline-none min-1350:hidden top-4 right-4 m-2 p-2 bg-gray-800 text-white rounded-full"
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

      <div className="h-screen overflow-y-hidden overflow-x-hidden w-screen max-1350:pl-0 max-1350:justify-center max-1350:items-center max-1350:pr-0 pl-[7rem] flex flex-col pr-[7rem] max-w-[1800px]">
        <HeaderSection />
        <ProductivityCards />
        <BgElements />
      </div>
    </>
  );
}
