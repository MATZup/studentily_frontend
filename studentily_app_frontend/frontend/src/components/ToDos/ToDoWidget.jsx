import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbtack,
  faPenToSquare,
  faTrash,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function ToDoWidget({
  id,
  title: initialTitle,
  textContent: initialTextContent,
  isPinned,
  editTodo,
  deleteTodo,
  pinnedTodo,
  markCompleted,
  markUncompleted,
  isCompleted,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [textContent, setTextContent] = useState(initialTextContent);
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 730);
  const [isVerySmallView, setIsVerySmallView] = useState(
    window.innerWidth <= 500
  );

  useEffect(() => {
    setTitle(initialTitle);
    setTextContent(initialTextContent);
    setIsChecked(isCompleted);
  }, [initialTitle, initialTextContent, isCompleted]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 730);
      setIsVerySmallView(window.innerWidth <= 500);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCheck = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    if (newCheckedState) {
      markCompleted(id);
    } else {
      markUncompleted(id);
    }
  };

  const getTextContent = () => {
    if (isVerySmallView) {
      return textContent && textContent.length > 40
        ? `${textContent.slice(0, 40)}...`
        : textContent;
    } else if (isMobileView) {
      return textContent && textContent.length > 80
        ? `${textContent.slice(0, 80)}...`
        : textContent;
    } else {
      return textContent && textContent.length > 160
        ? `${textContent.slice(0, 160)}...`
        : textContent;
    }
  };

  const getTitle = () => {
    if (isVerySmallView) {
      return title && title.length > 40 ? `${title.slice(0, 40)}...` : title;
    } else if (isMobileView) {
      return title && title.length > 100 ? `${title.slice(0, 100)}...` : title;
    } else {
      return title && title.length > 200 ? `${title.slice(0, 170)}...` : title;
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-center items-center w-full max-w-[82rem]">
        <div
          className={`bg-[#2D3046] break-all pl-5 pr-3 flex flex-col justify-center rounded-md min-h-14 p-2 hover:shadow-xl transition-all w-full ${
            isChecked ? "bg-[#4b4f67]" : ""
          }`}
          style={{ maxHeight: "200px" }}
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              {isChecked ? (
                <FontAwesomeIcon
                  className="text-[#84C6A0] mr-1 h-5 w-5 cursor-pointer"
                  icon={faCheckCircle}
                  onClick={handleCheck}
                />
              ) : (
                <div
                  className="p-[.55rem] mr-1 rounded-full border border-[#948cd3] h-4 w-4 flex items-center justify-center cursor-pointer hover:border-green-500"
                  onClick={handleCheck}
                ></div>
              )}
              <div>
                <h5 className="text-sm text-white text-left font-medium break-all">
                  {getTitle()}
                </h5>

                <div className="flex">
                  <div className="flex items-start flex-col">
                    <p className="text-xs leading-5 text-left text-gray-300 mr-2 break-all">
                      {getTextContent()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center pl-3 justify-center gap-4">
              <FontAwesomeIcon
                className={`${
                  isPinned
                    ? "text-[#948cd3]"
                    : "text-slate-400 hover:text-[#948cd3]"
                } cursor-pointer`}
                onClick={pinnedTodo}
                icon={faThumbtack}
              />
              <FontAwesomeIcon
                className="text-slate-400 hover:text-green-500 cursor-pointer"
                onClick={editTodo}
                icon={faPenToSquare}
              />
              <FontAwesomeIcon
                className="text-slate-400 hover:text-red-500 cursor-pointer"
                onClick={deleteTodo}
                icon={faTrash}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
