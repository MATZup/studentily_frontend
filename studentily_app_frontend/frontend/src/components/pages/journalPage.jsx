import React, { useEffect, useState } from "react";
import Navbar from "../Navigation/Navbar";
import JournalWidget from "../Journal/JournalWidget";
import { useNavigate } from "react-router-dom";
import axiosCall from "../utils/axiosInst";
import journalEmoji from "../images/emoji_icons/journal_emoji.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRightArrowLeft,
  faXmark,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import InputTags from "../auth/inputFields/InputTags";
import journalBgEl from "../images/journal_bg_element.png";
import Sidebar from "../Sidebar/Sidebar";

export default function JournalPage() {
  const [showOpenEditAddModal, setShowOpenEditAddModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [allJournalUnits, setAllJournalUnits] = useState([]);
  const [userInformation, setUserInformation] = useState(null);
  const [selectedJournalId, setSelectedJournalId] = useState(null);
  const [isExpandedLayout, setIsExpandedLayout] = useState(false);
  const [isChangeColor, setIsChangeColor] = useState(false);
  const [title, setTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const handleSwitchClick = () => {
    setIsExpandedLayout(!isExpandedLayout);
    setIsChangeColor((prevIsChangeColor) => !prevIsChangeColor);
  };

  const editHandler = (journalEdit) => {
    setSelectedJournalId(journalEdit._id);
    setShowOpenEditAddModal({ isShown: true, data: journalEdit, type: "edit" });
    setTitle(journalEdit.title || "");
    setTextContent(journalEdit.textContent || "");
    setTags(journalEdit.tags || []);
  };

  const getUserInformation = async () => {
    try {
      const response = await axiosCall.get("/get-user");
      if (response.data && response.data.user) {
        setUserInformation(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/");
      }
    }
  };

  const getAllJournalUnits = async () => {
    try {
      const response = await axiosCall.get("/get-all-journal-units");
      if (response.data && response.data.journalUnits) {
        setAllJournalUnits(response.data.journalUnits);
      }
    } catch (error) {
      console.log("Ops, An error occurred, please try it again.");
    }
  };

  const deleteJournalUnitHandler = async (data) => {
    const journalId = data._id;
    try {
      const response = await axiosCall.delete(
        "/delete-journal-unit/" + journalId
      );
      if (response.data && !response.data.error) {
        getAllJournalUnits();
      }
    } catch (error) {
      console.log("Ops, An error occurred, please try it again.");
    }
  };

  const pinnedHandler = async (dataOfJournal) => {
    const journalId = dataOfJournal._id;
    try {
      const response = await axiosCall.patch(
        "/update-pinned-journal-unit/" + journalId,
        {
          isPinned: !dataOfJournal.isPinned,
        }
      );
      if (response.data && response.data.journalUnit) {
        getAllJournalUnits();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleJournalAddOrUpdate = () => {
    setSelectedJournalId(null);
    setShowOpenEditAddModal({ isShown: false, type: "add", data: null });
    getAllJournalUnits();
  };

  useEffect(() => {
    getAllJournalUnits();
    getUserInformation();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAddClick = () => {
    setShowOpenEditAddModal({ isShown: true, type: "add", data: null });
    handleClearFields();
  };

  const handleClearFields = () => {
    setTitle("");
    setTextContent("");
    setTags([]);
  };

  return (
    <>
      <img
        src={journalBgEl}
        alt=""
        className="fixed -bottom-2 -left-[14rem] max-1250:w-[82.5rem] max-960:w-[79rem] max-767:w-[73rem] max-650:w-[70rem] max-465:w-[66rem] max-385:w-[63rem] max-350:w-[64rem] z-[-50] max-w-[89rem] overflow-hidden pl-16 pr-16 aspect-[16/9]"
      />

      <div className="max-580:hidden absolute left-0 top-0 p-8">
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

      <div className="flex items-center justify-center h-screen w-screen">
        <div className="flex flex-col items-center w-full max-465:px-3 max-767:px-5">
          <h1 className="max-580:hidden absolute mt-6 top-0 left-1/2 transform -translate-x-1/2 w-[8.5rem] font-bold pb-1 flex items-center justify-center border-b border-gray-300 mb-12">
            Journal
          </h1>
          <div className="mt-12 max-580:mt-2 flex w-full h-full items-center justify-center">
            <div
              id="custom_scrollbar"
              className="bg-[#191A27] overflow-y-auto max-640:mt-6 max-580:mt-1 max-640:mx-0 max-580:max-h-[37.1rem] between-767-960:max-h-[41rem] max-767:mt-6 max-767:h-[43rem] min-767:mx-[3.2rem] rounded-xl w-full max-w-[80rem] h-[39.9rem] p-4 md:p-7 flex flex-col md:flex-row justify-between"
            >
              <div
                id="left_side_wrapper"
                className="w-full md:w-[42%] flex flex-col items-start mb-4 md:mb-0"
              >
                <button
                  className="flex items-center justify-center mb-4 gap-1"
                  onClick={handleSwitchClick}
                >
                  <FontAwesomeIcon
                    className={`text-lg transform transition-transform duration-[350ms] hover:-rotate-180 ${
                      isChangeColor ? "text-slate-100" : "text-slate-400"
                    }`}
                    icon={faArrowRightArrowLeft}
                  />
                </button>
                <div
                  id="custom_scrollbar"
                  className="w-full overflow-y-auto py-2"
                >
                  {allJournalUnits.length > 0 ? (
                    <div className="grid grid-cols-1 gap-1 mr-4 max-767:flex">
                      {allJournalUnits.map((journalUnit, index) => (
                        <JournalWidget
                          key={journalUnit._id}
                          title={journalUnit.title}
                          dateOfJournal={journalUnit.createdAt}
                          textContent={journalUnit.textContent}
                          tags={journalUnit.tags}
                          isPinned={journalUnit.isPinned}
                          editJournal={() => editHandler(journalUnit)}
                          deleteJournal={() =>
                            deleteJournalUnitHandler(journalUnit)
                          }
                          pinnedJournal={() => pinnedHandler(journalUnit)}
                          isSelected={selectedJournalId === journalUnit._id}
                          setSelectedJournalId={setSelectedJournalId}
                          isExpandedLayout={isExpandedLayout}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center">
                      <img className="w-64" src={journalEmoji} alt="" />
                      <span className="-mt-2 text-gray-400">
                        By writing a <b>Journal</b> you can reflect, save
                        contents and
                        <br /> remember better!
                        <br /> Create your first Journal-Unit by clicking the
                        <br /> <b>Add </b> Button!
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full md:w-[55%] ml-0 md:ml-4">
                <EditAndAddJournal
                  onClose={() =>
                    setShowOpenEditAddModal({
                      isShown: false,
                      type: "add",
                      data: null,
                    })
                  }
                  type={showOpenEditAddModal.type}
                  dataOfJournal={showOpenEditAddModal.data}
                  getAllJournalUnits={getAllJournalUnits}
                  handleJournalAddOrUpdate={handleJournalAddOrUpdate}
                  setSelectedJournalId={setSelectedJournalId}
                  showCloseButton={showOpenEditAddModal.isShown}
                  title={title}
                  setTitle={setTitle}
                  textContent={textContent}
                  setTextContent={setTextContent}
                  tags={tags}
                  setTags={setTags}
                  error={error}
                  setError={setError}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function EditAndAddJournal({
  dataOfJournal,
  type,
  getAllJournalUnits,
  onClose,
  handleJournalAddOrUpdate,
  setSelectedJournalId,
  showCloseButton,
}) {
  const [title, setTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

  const clearFields = () => {
    setTitle("");
    setTextContent("");
    setTags([]);
  };

  useEffect(() => {
    if (dataOfJournal) {
      setTitle(dataOfJournal.title || "");
      setTextContent(dataOfJournal.textContent || "");
      setTags(dataOfJournal.tags || []);
    }
  }, [dataOfJournal]);

  const createNewJournalUnit = async () => {
    try {
      const response = await axiosCall.post("/create-journal-unit", {
        title,
        textContent,
        tags,
      });
      if (response.data && response.data.journalUnit) {
        getAllJournalUnits();
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

  const editJournalUnit = async () => {
    const journalId = dataOfJournal._id;
    try {
      const response = await axiosCall.patch(
        "/edit-journal-unit/" + journalId,
        {
          title,
          textContent,
          tags,
        }
      );
      if (response.data && response.data.journalUnit) {
        getAllJournalUnits();
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

  const journalAddHandler = () => {
    setSelectedJournalId(null);

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
      editJournalUnit();
    } else {
      createNewJournalUnit();
    }

    setTitle("");
    setTextContent("");
    setTags([]);

    handleJournalAddOrUpdate();
  };

  const handleClearAndClose = () => {
    clearFields();
    onClose();
  };

  return (
    <div className="relative max-580:mb-[.2rem] mb-12 pr-1 max-1350:pr-0 max-767:pr-0">
      <div className="flex text-start flex-col gap-2">
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
          className="text-sm text-[#dfdfdf] max-640:max-h-[17rem] max-767:max-h-[18.5rem] max-500:max-h-[12.8rem] rounded-xl outline-none bg-[#2D3046] p-3"
          placeholder="Content..."
          cols="40"
          rows="21"
          value={textContent}
          onChange={({ target }) => setTextContent(target.value)}
        ></textarea>
      </div>

      <div
        id="wrapper_button_tags"
        className="flex max-465:flex-col max-465:items-start max-465:gap-4 items-center justify-between mt-4"
      >
        <div className="">
          <InputTags tags={tags} setTags={setTags} />
        </div>
        {error && (
          <p className="text-red-600 min-465:p-2 text-xs pt-3 max-960:pt-0">
            {error}
          </p>
        )}

        <div className="flex items-center">
          {showCloseButton && (
            <button
              className="cursor-pointer flex items-center mr-2"
              onClick={handleClearAndClose}
            >
              <FontAwesomeIcon
                className="text-slate-400 text-xl"
                icon={faXmark}
              />
            </button>
          )}

          <button
            className="right-0 max-960:w-[7.5rem] font-medium w-[10rem] text-white rounded-full hover:bg-[#877fc5] transition-all p-1 bg-[#726AB1]"
            onClick={journalAddHandler}
          >
            {type === "edit" ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
