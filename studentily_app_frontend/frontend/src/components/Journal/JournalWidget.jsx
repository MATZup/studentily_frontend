import React, { useState, useEffect } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbtack,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function JournalWidget({
  title,
  dateOfJournal,
  textContent,
  tags,
  isPinned,
  editJournal,
  deleteJournal,
  pinnedJournal,
  isSelected,
  setSelectedJournalId,
  isExpandedLayout,
  setShowCloseButton,
}) {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1139);
  const [isSmallViewSmaller, setIsSmallViewSmaller] = useState(
    window.innerWidth <= 906
  );
  const [isSmallViewBreak, setIsSmallViewBreak] = useState(
    window.innerWidth <= 767
  );
  const [isSmallView, setIsSmallView] = useState(window.innerWidth <= 639);
  const [isVerySmallView, setIsVerySmallView] = useState(
    window.innerWidth <= 500
  );
  const [isSmallestView, setIsSmallestView] = useState(
    window.innerWidth <= 370
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1193);
      setIsSmallViewBreak(window.innerWidth <= 767);
      setIsSmallView(window.innerWidth <= 639);
      setIsSmallViewSmaller(window.innerWidth <= 906);
      setIsVerySmallView(window.innerWidth <= 500);
      setIsSmallestView(window.innerWidth <= 370);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive TextContent
  const getTextContent = (isExpanded) => {
    let maxLength;
    if (isExpanded) {
      maxLength = isSmallestView
        ? 300
        : isVerySmallView
        ? 335
        : isSmallViewBreak
        ? 630
        : isSmallView
        ? 750
        : isSmallViewSmaller
        ? 430
        : isMobileView
        ? 700
        : 1070;
    } else {
      maxLength = isSmallestView
        ? 58
        : isVerySmallView
        ? 80
        : isSmallView
        ? 125
        : isSmallViewBreak
        ? 137
        : isSmallViewSmaller
        ? 48
        : isMobileView
        ? 65
        : 98;
    }
    return textContent && textContent.length > maxLength
      ? `${textContent.slice(0, maxLength)}...`
      : textContent;
  };

  // Responsive Title
  const getTitle = () => {
    let maxLength;
    if (isVerySmallView) {
      maxLength = 35;
    } else if (isSmallView) {
      maxLength = 60;
    } else if (isSmallViewSmaller) {
      maxLength = 40;
    } else if (isSmallViewBreak) {
      maxLength = 105;
    } else if (isMobileView) {
      maxLength = 54;
    } else {
      maxLength = 80;
    }
    return title && title.length > maxLength
      ? `${title.slice(0, maxLength)}...`
      : title;
  };

  // Widget ausgefahren und nicht ausgefahren (default) - Responsive
  const getHeightClass = (isExpanded) => {
    if (isExpanded) {
      return isVerySmallView
        ? "h-[20.5rem]"
        : isSmallView
        ? "h-[25rem]"
        : isSmallViewBreak
        ? "h-[25rem]"
        : isSmallViewSmaller
        ? "h-[29rem]"
        : isMobileView
        ? "h-[32rem]"
        : "h-[32rem]";
    } else {
      return isVerySmallView
        ? "h-[9.4rem]"
        : isSmallView
        ? "h-[9.4rem]"
        : isSmallViewBreak
        ? "h-[8.3rem]"
        : isSmallViewSmaller
        ? "h-[8.3rem]"
        : isMobileView
        ? "h-[8.3rem]"
        : "h-[8.3rem]";
    }
  };

  return (
    <div
      className={`${
        isSelected ? "bg-[#3f4362]" : "bg-[#2D3046]"
      } rounded-md p-2 pl-3 transition-all duration-[400ms] pr-3 ${getHeightClass(
        isExpandedLayout
      )}`}
      style={{ minWidth: "85%", width: "auto", overflowY: "hidden" }}
    >
      <div className="flex justify-between">
        <div className="flex flex-col items-start">
          <h5 className="text-sm text-white text-left font-medium break-all">
            {getTitle()}
          </h5>
          <span className="text-xs mt-2 text-left text-slate-400">
            {moment(dateOfJournal).format("Do MMM YYYY")}
          </span>
        </div>
        <div className="pl-2 pr-[.17rem]">
          <FontAwesomeIcon
            className={`${
              isPinned
                ? "text-[#948cd3]"
                : "text-slate-400 hover:text-[#948cd3]"
            }`}
            onClick={pinnedJournal}
            icon={faThumbtack}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex items-start flex-col">
          <p
            className={`text-xs leading-5 text-left transition-all duration-[400ms] mt-2 text-white mr-2 break-all ${
              isExpandedLayout ? "max-h-[800px]" : "max-h-[120px]"
            }`}
          >
            {getTextContent(isExpandedLayout)}
          </p>
          <div className="text-xs mt-1 text-slate-400">
            {tags.map((tag) => `#${tag} `)}
          </div>
        </div>

        <div className="flex -mt-1 flex-col pb-2 items-center gap-5">
          <FontAwesomeIcon
            className="text-slate-400 hover:text-green-500"
            onClick={() => {
              setSelectedJournalId(dateOfJournal._id);
              editJournal();
              setShowCloseButton(true); // Show close button
            }}
            icon={faPenToSquare}
          />
          <FontAwesomeIcon
            className="text-slate-400 hover:text-red-500"
            onClick={deleteJournal}
            icon={faTrash}
          />
        </div>
      </div>
    </div>
  );
}
