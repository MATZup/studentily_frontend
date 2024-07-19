import React, { useEffect, useState } from "react";
import NotesWidget from "../Notes/NotesWidget";
import EditAndAddNotes from "../Notes/EditAndAddNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosCall from "../utils/axiosInst";
import notesEmoji from "../images/emoji_icons/notes_emoji.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import notesBgEl from "../images/todos_bg_element.png";
import Sidebar from "../Sidebar/Sidebar";

export default function NotesPage() {
  const [showOpenEditAddModal, setShowOpenEditAddModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [allNotes, setAllNotes] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const editHandler = (noteEdit) => {
    setShowOpenEditAddModal({ isShown: true, data: noteEdit, type: "edit" });
  };

  const getUserInformation = async () => {
    try {
      const response = await axiosCall.get("/get-user");
      if (response.data && response.data.user) {
        // Set user information falls erforderlich
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/");
        console.log("Hier ist ein Fehler man");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosCall.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(
        "Ops, ein Fehler ist aufgetreten, bitte versuchen Sie es erneut."
      );
    }
  };

  const deleteNoteHandler = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosCall.delete("/delete-note/" + noteId);
      if (response.data && !response.data.error) {
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(
          "Ops, ein Fehler ist aufgetreten, bitte versuchen Sie es erneut."
        );
      }
    }
  };

  const pinnedHandler = async (dataOfNote) => {
    const noteId = dataOfNote._id;
    try {
      const response = await axiosCall.patch("/update-pinned-note/" + noteId, {
        isPinned: !dataOfNote.isPinned,
      });
      if (response.data && response.data.note) {
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInformation();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <img
        src={notesBgEl}
        alt=""
        className="fixed -bottom-1 -right-[38rem] max-960:w-[79rem] max-767:w-[74rem] max-650:w-[70rem] max-465:w-[64rem] max-385:w-[61rem] max-350:w-[59rem] z-[-50] max-w-[84rem] overflow-hidden pl-16 pr-16 aspect-[16/9]"
      />

      <div className="max-580:hidden fixed left-0 top-0 p-8">
        <FontAwesomeIcon
          onClick={() => navigate("/")}
          className="w-[2.1rem] h-[2.1rem] cursor-pointer"
          icon={faArrowLeft}
        />
      </div>

      <button
        className="fixed z-[800] outline-none min-1350:hidden top-4 right-4 m-2 p-2 bg-gray-800 text-white rounded-full"
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

      <div className="max-640:px-3 max-465:px-2 max-420:px-1 max-385:px-0 flex flex-col items-center justify-center w-full px-6 lg:px-10">
        <h1 className="max-580:hidden absolute mt-6 top-0 left-1/2 transform -translate-x-1/2 w-[6.7rem] font-bold pb-1 flex items-center justify-center border-b border-gray-300 mb-12">
          Notes
        </h1>
        <div className="flex justify-center items-center w-full h-screen">
          <div className="w-full mb-[1.5rem]">
            <div className="max-h-[calc(87vh-8rem)] w-full overflow-y-auto px-4">
              {allNotes.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                  {allNotes.map((note) => (
                    <NotesWidget
                      key={note._id}
                      title={note.title}
                      dateOfNote={note.createdAt}
                      textContent={note.textContent}
                      tags={note.tags}
                      isPinned={note.isPinned}
                      editNote={() => editHandler(note)}
                      deleteNote={() => deleteNoteHandler(note)}
                      pinnedNote={() => pinnedHandler(note)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col mb-56 justify-center items-center">
                  <img className="w-64" src={notesEmoji} alt="Notes Emoji" />
                  <span className="-mt-2 text-center">
                    Create your first <b>Note!</b> Just click the <b>Create</b>{" "}
                    Button below.
                    <br />
                    Save information and access your data easily by writing{" "}
                    <b>Notes!</b>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-12 left-0 w-full flex justify-center pointer-events-none">
        <button
          onClick={() => {
            setShowOpenEditAddModal({ isShown: true, type: "add", data: null });
          }}
          className="pointer-events-auto outline-none font-medium w-[7.5rem] text-md h-10 text-white bg-gray-800 rounded-full hover:w-[8.1rem] transition-all ease-in-out"
        >
          Create
        </button>
      </div>
      <Modal
        isOpen={showOpenEditAddModal.isShown}
        onRequestClose={() =>
          setShowOpenEditAddModal({ isShown: false, type: "add", data: null })
        }
        overlayClassName="fixed inset-0 bg-blue-900 bg-opacity-20 flex justify-center items-center z-50"
        className="customContent"
        contentLabel="Edit or Add Note Modal"
      >
        <EditAndAddNotes
          onClose={() => {
            setShowOpenEditAddModal({
              isShown: false,
              type: "add",
              data: null,
            });
          }}
          type={showOpenEditAddModal.type}
          dataOfNote={showOpenEditAddModal.data}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  );
}
