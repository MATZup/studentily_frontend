import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function InputTags({ tags, setTags }) {
  const [valueOfInput, setValueOfInput] = useState("");

  const changeInputHandler = (e) => {
    setValueOfInput(e.target.value);
  };

  const createTag = () => {
    if (valueOfInput.trim() !== "") {
      setTags([...tags, valueOfInput.trim()]);
      setValueOfInput("");
    }
  };

  const KeyDownHandler = (e) => {
    if (e.key === "Enter") {
      createTag();
    }
  };

  const removeTagHandler = (removeCurrentTag) => {
    setTags(tags.filter((tag) => tag !== removeCurrentTag));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center text-sm gap-2 flex-wrap mt-1 mb-4">
          {tags.map((tag, currentIndex) => (
            <span className="bg-slate-100 px-2 py-1 rounded" key={currentIndex}>
              <span className="font-medium"># </span>
              {tag}
              <button
                onClick={() => {
                  removeTagHandler(tag);
                }}
              >
                <FontAwesomeIcon icon={faXmark} className="ml-1" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4">
        <input
          type="text"
          className="w-[10rem] between-767-960:w-[8.5rem] text-sm w-text-sm px-2 py-1 rounded text-white bg-[#2D3046] outline-none"
          placeholder="Add Tags"
          value={valueOfInput}
          onChange={changeInputHandler}
          onKeyDown={KeyDownHandler}
        />
        <button
          className="flex items-center"
          onClick={() => {
            createTag();
          }}
        >
          <FontAwesomeIcon
            className="text-xl text-[#726AB1] transform transition-transform duration-[350ms] hover:-rotate-90"
            icon={faPlus}
          />
        </button>
      </div>
    </div>
  );
}
