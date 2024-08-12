import React from "react";
import { useNavigate } from "react-router-dom";
import notesIcon from "../images/notes_icon.png";
import pomodoroIcon from "../images/pomodoro_icon.png";
import todosIcon from "../images/todos_icon.png";
import journalIcon from "../images/journal_icon.png";

export default function ProductivityCards() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div
        id="cards_wrapper"
        className="flex flex-wrap gap-6 justify-center max-w-full"
      >
        <button
          tabIndex="1"
          onClick={() => navigate("/notes")}
          className="flex flex-col items-center justify-center w-80 h-40 max-w-[26.5rem] max-h-[8rem] bg-[#FFEB95] rounded-2xl drop-shadow-xl transition-all duration-300 hover:w-[27rem] hover:h-[8.5rem]"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-[.6rem] font-bold text-[#D6BF5F]">
              Notes
            </span>
            <img className="w-[3.3rem] mb-[.3rem]" src={notesIcon} alt="Notes Icon" />
          </div>
        </button>

        <button
          tabIndex="2"
          onClick={() => navigate("/pomodoro")}
          className="flex flex-col items-center justify-center w-80 h-40 max-w-[26.5rem] max-h-[8rem] bg-[#fa746d] rounded-2xl drop-shadow-xl transition-all duration-300 hover:w-[27rem] hover:h-[8.5rem]"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-[.4rem] font-bold text-[#B9514C]">
              Pomodoro
            </span>
            <img className="w-[4.4rem] mb-[1.2rem]" src={pomodoroIcon} alt="Pomodoro Icon" />
          </div>
        </button>

        <button
          tabIndex="3"
          onClick={() => navigate("/todos")}
          className="flex flex-col items-center justify-center w-80 h-40 max-w-[26.5rem] max-h-[8rem] bg-[#92E0B3] rounded-2xl drop-shadow-xl transition-all duration-300 hover:w-[27rem] hover:h-[8.5rem]"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-[.8rem] font-bold text-[#72A889]">
              Todos
            </span>
            <img className="w-16 mb-[.95rem]" src={todosIcon} alt="Todos Icon" />
          </div>
        </button>

        <button
          tabIndex="4"
          onClick={() => navigate("/journal")}
          className="flex flex-col items-center justify-center w-80 h-40 max-w-[26.5rem] max-h-[8rem] bg-[#9D95DD] rounded-2xl drop-shadow-xl transition-all duration-300 hover:w-[27rem] hover:h-[8.5rem]"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-[.8rem] font-bold text-[#736AB1]">
              Journal
            </span>
            <img className="w-[3.5rem] mb-[.95rem]" src={journalIcon} alt="Journal Icon" />
          </div>
        </button>
      </div>
    </div>
  );
}
