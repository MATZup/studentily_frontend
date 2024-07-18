import React, { useState, useEffect } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbtack,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function NotesWidget({
  title,
  dateOfNote,
  textContent,
  tags,
  isPinned,
  editNote,
  deleteNote,
  pinnedNote,
}) {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 760);
  const [isSmallView, setIsSmallView] = useState(window.innerWidth <= 639);
  const [isVerySmallView, setIsVerySmallView] = useState(
    window.innerWidth <= 500
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 760);
      setIsSmallView(window.innerWidth <= 639);
      setIsVerySmallView(window.innerWidth <= 500);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getTextContent = () => {
    if (isVerySmallView) {
      return textContent && textContent.length > 140
        ? `${textContent.slice(0, 140)}...`
        : textContent;
    } else if (isSmallView) {
      return textContent && textContent.length > 145
        ? `${textContent.slice(0, 250)}...`
        : textContent;
    } else if (isMobileView) {
      return textContent && textContent.length > 140
        ? `${textContent.slice(0, 140)}...`
        : textContent;
    } else {
      return textContent && textContent.length > 280
        ? `${textContent.slice(0, 280)}...`
        : textContent;
    }
  };

  const getTitle = () => {
    if (isVerySmallView) {
      return title && title.length > 40 ? `${title.slice(0, 40)}...` : title;
    } else if (isSmallView) {
      return title && title.length > 100 ? `${title.slice(0, 100)}...` : title;
    } else if (isMobileView) {
      return title && title.length > 80 ? `${title.slice(0, 80)}...` : title;
    } else {
      return title && title.length > 120 ? `${title.slice(0, 120)}...` : title;
    }
  };

  return (
    <div className="bg-[#2D3046] rounded-md min-h-40 max-h-80 p-4 hover:shadow-xl transition-all">
      <div className="flex justify-between">
        <div className="flex flex-col items-start">
          <h5 className="text-sm text-white text-left font-medium word-break: break-all">
            {getTitle()}
          </h5>
          <span className="text-xs mt-2 text-left text-slate-400">
            {moment(dateOfNote).format("Do MMM YYYY")}
          </span>
        </div>
        <div className="pl-2 pr-[.19rem]">
          <FontAwesomeIcon
            className={`${
              isPinned
                ? "text-[#948cd3]"
                : "text-slate-400 hover:text-[#948cd3]"
            }`}
            onClick={pinnedNote}
            icon={faThumbtack}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex items-start flex-col">
          <p className="text-xs leading-5 text-left mt-2 text-white mr-2 word-break: break-all">
            {getTextContent()}
          </p>
          <div className="text-xs mt-2 text-slate-400">
            {tags.map((tag) => `#${tag} `)}
          </div>
        </div>

        <div className="flex flex-col -mt-1 items-center gap-5">
          <FontAwesomeIcon
            className="text-slate-400 hover:text-green-500"
            onClick={editNote}
            icon={faPenToSquare}
          />
          <FontAwesomeIcon
            className="text-slate-400 hover:text-red-500"
            onClick={deleteNote}
            icon={faTrash}
          />
        </div>
      </div>
    </div>
  );
}
