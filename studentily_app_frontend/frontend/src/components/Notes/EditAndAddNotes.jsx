import React, { useState } from "react";
import InputTags from "../auth/inputFields/InputTags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axiosCall from "../utils/axiosInst";

export default function EditAndAddNotes({
  dataOfNote,
  type,
  getAllNotes,
  onClose,
}) {
  const [title, setTitle] = useState(dataOfNote?.title || "");
  const [textContent, setTextContent] = useState(dataOfNote?.textContent || "");
  const [tags, setTags] = useState(dataOfNote?.tags || []);

  const [error, setError] = useState(null);

  // Neues Note hinzufügen
  const createNewNote = async () => {
    try {
      const response = await axiosCall.post("/create-note", {
        title,
        textContent,
        tags,
      });

      if (response.data && response.data.note) {
        getAllNotes();
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

  // Note edit
  const editNote = async () => {
    const noteId = dataOfNote._id;
    try {
      const response = await axiosCall.patch("/edit-note/" + noteId, {
        title,
        textContent,
        tags,
      });

      if (response.data && response.data.note) {
        getAllNotes();
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

  const noteAddHandler = () => {
    if (!title) {
      setError("Please write a title");
      return;
    }
    if (!textContent) {
      setError("Please write your content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      createNewNote();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#2d2d38] bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-[#191A27] p-6 rounded-lg max-w-[50rem] w-full mx-24 max-870:mx-0 max-1060:w-[45rem] max-870:w-[40rem] max-730:w-[35rem] max-650:w-[32rem] max-580:w-[28rem] max-500:w-[26rem] max-465:w-[24rem] max-420:w-[21rem] max-385:w-[19rem] max-350:w-[18rem] max-327:w-[17rem] max-307:w-[16rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 hover:bg-slate-200 transition-all w-8 h-8 rounded-full flex items-center justify-center"
          onClick={onClose}
        >
          <FontAwesomeIcon className="text-slate-400 text-xl" icon={faXmark} />
        </button>

        <div className="flex text-start flex-col gap-2 mt-5">
          <input
            type="text"
            className="text-2xl text-white bg-[#191A27] outline-none"
            placeholder="Title..."
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <textarea
            type="text"
            className="text-sm max-650:max-h-[21rem] max-465:max-h-[18rem] max-385:max-h-[14rem] text-[#dfdfdf] rounded-xl outline-none bg-[#2D3046] p-3"
            placeholder="Content..."
            name=""
            cols="30"
            rows="19"
            value={textContent}
            onChange={({ target }) => setTextContent(target.value)}
          ></textarea>
        </div>

        <div
          id="add_tag_wrapper"
          className="max-465:flex-col max-465:items-start max-465:gap-3 flex items-center justify-between mt-4"
        >
          <div>
            <InputTags tags={tags} setTags={setTags} />
          </div>

          {error && <p className="text-red-600 text-xs pt-3">{error}</p>}

          <button
            className="right-0 font-medium max-960:w-[7.5rem] w-[10rem] text-white rounded-full hover:bg-[#877fc5] transition-all p-1 bg-[#726AB1]"
            onClick={noteAddHandler}
          >
            {type === "edit" ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
