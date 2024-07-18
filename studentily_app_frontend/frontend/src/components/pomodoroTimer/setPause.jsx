import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause } from "@fortawesome/free-solid-svg-icons";

export default function setPause({ onClick }) {
  return (
    <div onClick={onClick}>
      <button>
        <div className="flex justify-center items-center w-16 h-16 bg-[flex justify-center items-center w-16 h-16 bg-gray-800 text-white rounded-[100%] p-4">
          <FontAwesomeIcon className="w-[2.2rem] h-[2.2rem]" icon={faPause} />
        </div>
      </button>
    </div>
  );
}
