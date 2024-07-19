import React from "react";
import { useNavigate } from "react-router-dom";
import notesIcon from "../images/notes_icon.png";
import pomodoroIcon from "../images/pomodoro_icon.png";
import todosIcon from "../images/todos_icon.png";
import journalIcon from "../images/journal_icon.png";

export default function productivityCards() {
  const navigate = useNavigate();

  return (
    <div className="max-1350:flex max-1350:items-center max-1350:justify-center max-1350:h-full">
      <div
        id="cards_wrapper"
        className="max-767:-mt-[44px] between-768-1350:-mt-[2rem] max-767:-mt-16 max-767:px-6 max-970:gap-4 max-970:w-full max-970:mx-8 flex flex-wrap max-1350:justify-center max-1350:pr-0 max-900:justify-center pr-[7rem] z-[70] max-1200:w-[60rem] w-[70rem] min-1350:max-w-[50rem] absolute top-[35%] gap-6"
      >
        <div
          id="notesCard"
          className="max-500:h-[5.6rem] max-500:hover:bg-black w-80 h-40 max-720:h-[7.2rem] max-720:w-[26.5rem] max-767:w-[26rem] 767:h-[7.5rem] max-767:hover:w-[27rem] max-767:hover:h-[8.5rem] max-970:w-[20rem] between-768-970:h-[10.5rem] max-970:hover:h-[11.5rem] max-970:hover:w-[21rem] max-1200:w-[23rem] max-1200:h-[12rem] max-1200:hover:h-[13rem] max-1200:hover:w-[24rem] max-1350:w-[26rem] max-1350:h-[13rem] max-1350:hover:w-[27rem] max-1350:hover:h-[14rem] bg-[#FFEB95] flex flex-col items-center justify-center rounded-2xl hover:w-[21rem] hover:h-[11rem] transition-all duration-300 drop-shadow-xl cursor-pointer"
          onClick={() => navigate("/notes")}
        >
          <div className="flex max-767:gap-4 max-767:flex-row-reverse flex-col items-center justify-center">
            <span className="text-3xl mb-[.6rem] font-bold text-[#D6BF5F]">
              Notes
            </span>

            <img className="w-[3.3rem] mb-[.3rem]" src={notesIcon} alt="" />
          </div>
        </div>
        <div
          id="pomodoroCard"
          className="max-500:h-[5.6rem] max-500:hover:h-0 w-80 max-767:w-[26rem] 767:h-[7.5rem] h-40 max-720:h-[7.2rem] max-720:w-[26.5rem] max-767:hover:w-[27rem] max-767:hover:h-[8.5rem] max-970:w-[20rem] max-970:h-[10.5rem] max-970:hover:h-[11.5rem] max-970:hover:w-[21rem] max-1200:w-[23rem] max-1200:h-[12rem] max-1200:hover:h-[13rem] max-1200:hover:w-[24rem] max-1350:w-[26rem] max-1350:h-[13rem] max-1350:hover:w-[27rem] max-1350:hover:h-[14rem] drop-shadow-xl bg-[#fa746d] cursor-pointer pt-3 flex flex-col items-center justify-center rounded-2xl hover:w-[21rem] hover:h-[11rem] transition-all duration-300"
          onClick={() => navigate("/pomodoro")}
        >
          <div
            id="pomodoroInside"
            className="max-767:gap-4 max-767:flex-row-reverse flex flex-col items-center justify-center"
          >
            <span className="text-3xl mb-[.4rem] font-bold text-[#B9514C]">
              Pomodoro
            </span>
            <img className="w-[4.4rem] mb-[1.2rem]" src={pomodoroIcon} alt="" />
          </div>
        </div>
        <div
          id="todosCard"
          className="max-500:h-[5.6rem] max-500:hover:h-0 w-80 h-40 max-767:w-[26rem] 767:h-[7.5rem] max-720:h-[7.2rem] max-720:w-[26.5rem] max-767:hover:w-[27rem] max-767:hover:h-[8.5rem] max-970:w-[20rem] max-970:h-[10.5rem] max-970:hover:h-[11.5rem] max-970:hover:w-[21rem] max-1200:w-[23rem] max-1200:h-[12rem] max-1200:hover:h-[13rem] max-1200:hover:w-[24rem] max-1350:w-[26rem] max-1350:h-[13rem] max-1350:hover:w-[27rem] max-1350:hover:h-[14rem] drop-shadow-xl bg-[#92E0B3] pt-3 cursor-pointer flex flex-col items-center justify-center rounded-2xl hover:w-[21rem] hover:h-[11rem] transition-all duration-300"
          onClick={() => navigate("/todos")}
        >
          <div
            id="todosInside"
            className="max-767:gap-4 max-767:flex-row-reverse flex flex-col items-center justify-center"
          >
            <span className="text-3xl mb-[.8rem] font-bold text-[#72A889]">
              Todos
            </span>
            <img className="w-16 mb-[.95rem]" src={todosIcon} alt="" />
          </div>
        </div>
        <div
          id="journalCard"
          className="max-500:h-[5.6rem] max-500:hover:h-0 w-80 h-40 max-767:w-[26rem] 767:h-[7.5rem] max-720:h-[7.2rem] max-720:w-[26.5rem] max-767:hover:w-[27rem] max-767:hover:h-[8.5rem] max-970:w-[20rem] max-970:h-[10.5rem] max-970:hover:h-[11.5rem] max-970:hover:w-[21rem] max-1200:w-[23rem] max-1200:h-[12rem] max-1200:hover:h-[13rem] max-1200:hover:w-[24rem] max-1350:w-[26rem] max-1350:h-[13rem] max-1350:hover:w-[27rem] max-1350:hover:h-[14rem] drop-shadow-xl bg-[#9D95DD] pt-3 cursor-pointer flex flex-col items-center justify-center rounded-2xl hover:w-[21rem] hover:h-[11rem] transition-all duration-300"
          onClick={() => navigate("/journal")}
        >
          <div
            id="journalInside"
            className="max-767:gap-4 max-767:flex-row-reverse flex flex-col items-center justify-center"
          >
            <span className="text-3xl mb-[.8rem] font-bold text-[#736AB1]">
              Journal
            </span>
            <img className="w-[3.5rem] mb-[.95rem]" src={journalIcon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
