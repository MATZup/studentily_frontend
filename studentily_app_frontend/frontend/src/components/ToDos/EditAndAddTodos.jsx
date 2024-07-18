import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import axiosCall from "../utils/axiosInst";

export default function EditAndAddTodos({
  dataOfTodo,
  type,
  getAllTodos,
  onClose,
}) {
  const [title, setTitle] = useState(dataOfTodo?.title || "");
  const [textContent, setTextContent] = useState(dataOfTodo?.textContent || "");
  const [error, setError] = useState(null);

  const createNewTodo = async () => {
    try {
      const response = await axiosCall.post("/create-todo", {
        title,
        textContent,
      });

      if (response.data && response.data.todo) {
        setTitle("");
        setTextContent("");
        getAllTodos();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const editTodo = async () => {
    const todoId = dataOfTodo._id;
    const requestBody = {
      title,
      textContent: textContent.trim() !== "" ? textContent.trim() : "",
    };

    try {
      const response = await axiosCall.patch(
        `/edit-todo/${todoId}`,
        requestBody
      );

      if (response.data && response.data.todo) {
        setTitle("");
        setTextContent("");
        getAllTodos();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while updating the todo.");
      }
    }
  };

  const todoAddHandler = () => {
    if (!title) {
      setError("Please write a Todo");
      return;
    }

    setError("");

    if (type === "edit") {
      editTodo();
    } else {
      createNewTodo();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      todoAddHandler();
    }
  };

  return (
    <div className="relative">
      <button
        className="absolute -top-9 -right-3 hover:bg-slate-200 transition-all w-8 h-8 rounded-full flex items-center justify-center"
        onClick={onClose}
      >
        <FontAwesomeIcon className="text-slate-400 text-xl" icon={faXmark} />
      </button>

      <div className="flex text-start flex-col gap-2 mt-5">
        <input
          type="text"
          className="text-2xl text-white mb-3 bg-[#191A27] outline-none"
          placeholder="Todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <textarea
          type="text"
          className="text-sm text-[#dfdfdf] rounded-xl outline-none bg-[#2D3046] p-3"
          placeholder="Comment..."
          name=""
          cols="30"
          rows="10"
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>
      </div>

      <div className="flex items-center justify-between mt-4">
        {error && <p className="text-red-600 text-xs pt-3">{error}</p>}
        <button
          className="right-0 font-medium max-960:w-[7.5rem] w-[10rem] text-white rounded-full hover:bg-[#877fc5] transition-all p-1 bg-[#726AB1]"
          onClick={todoAddHandler}
        >
          {type === "edit" ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
}
