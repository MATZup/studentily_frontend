import React, { useEffect, useState } from "react";
import Navbar from "../Navigation/Navbar";
import TodoWidget from "../ToDos/ToDoWidget";
import EditAndAddTodos from "../ToDos/EditAndAddTodos";
import { useNavigate } from "react-router-dom";
import axiosCall from "../utils/axiosInst";
import Modal from "react-modal";
import todosEmoji from "../images/emoji_icons/todos_emoji.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPaperPlane,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import todosBgEl from "../images/todos_bg_element.png";
import Sidebar from "../Sidebar/Sidebar";

export default function TodosPage() {
  const [allTodos, setAllTodos] = useState([]);
  const [userInformation, setUserInformation] = useState(null);
  const [showOpenEditAddModal, setShowOpenEditAddModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [newTitle, setNewTitle] = useState("");
  const [newTextContent, setNewTextContent] = useState("");
  const [error, setError] = useState(null);
  const [showCommentField, setShowCommentField] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const editHandler = (todoEdit) => {
    setShowOpenEditAddModal({ isShown: true, data: todoEdit, type: "edit" });
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

  const getAllTodos = async () => {
    try {
      const response = await axiosCall.get("/get-all-todos");
      if (response.data && response.data.todos) {
        setAllTodos(response.data.todos);
      }
    } catch (error) {
      console.log("Ops, An error occurred, please try it again.");
    }
  };

  const createNewTodo = async () => {
    if (!newTitle) {
      setError("Please write a Todo");
      return;
    }

    try {
      const response = await axiosCall.post("/create-todo", {
        title: newTitle,
        textContent: newTextContent,
      });

      if (response.data && response.data.todo) {
        setNewTitle("");
        setNewTextContent("");
        setShowCommentField(false);
        setError(null);
        getAllTodos();
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

  const deleteTodoHandler = async (data) => {
    const todoId = data._id;
    try {
      const response = await axiosCall.delete("/delete-todo/" + todoId);
      if (response.data && !response.data.error) {
        getAllTodos();
      }
    } catch (error) {
      console.log("Ops, An error occurred, please try it again.");
    }
  };

  const pinnedHandler = async (dataOfTodo) => {
    const todoId = dataOfTodo._id;
    try {
      const response = await axiosCall.patch("/update-pinned-todo/" + todoId, {
        isPinned: !dataOfTodo.isPinned,
      });
      if (response.data && response.data.todo) {
        getAllTodos();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const markCompleted = async (id) => {
    try {
      const response = await axiosCall.patch(`/todos/${id}/mark-completed`);
      if (response.data && response.data.todo) {
        setAllTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, isCompleted: true } : todo
          )
        );
      }
    } catch (error) {
      console.error("Error marking todo as completed:", error);
    }
  };

  const markUncompleted = async (id) => {
    try {
      const response = await axiosCall.patch(`/todos/${id}/mark-uncompleted`);
      if (response.data && response.data.todo) {
        setAllTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, isCompleted: false } : todo
          )
        );
      }
    } catch (error) {
      console.error("Error marking todo as uncompleted:", error);
    }
  };

  useEffect(() => {
    getAllTodos();
    getUserInformation();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      createNewTodo();
    }
  };

  const completedTodos = allTodos.filter((todo) => todo.isCompleted);
  const activeTodos = allTodos.filter((todo) => !todo.isCompleted);

  return (
    <>
      <img
        src={todosBgEl}
        alt=""
        className="fixed -bottom-1 -right-[34rem] max-960:w-[75rem] max-768:w-[70rem] max-650:w-[65rem] max-465:w-[60rem] max-385:w-[58rem] max-350:w-[56rem] z-[-50] max-w-[83rem] overflow-hidden pl-16 pr-16 aspect-[16/9]"
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

      <div className="flex justify-center">
        <h1 className="max-580:hidden absolute mt-6 top-0 left-1/2 transform -translate-x-1/2 w-[6.8rem] font-bold pb-1 flex items-center justify-center border-b border-gray-300 mb-12">
          Todos
        </h1>
        <div className="fixed z-50 bottom-8 w-full max-w-[82rem] mx-auto px-[3rem] max-1350:px-10 max-580:px-4">
          <div className="relative text-start bg-gray-800 rounded-xl p-3">
            <input
              type="text"
              className="text-md pr-10 text-white placeholder:text-white bg-gray-800 outline-none w-full "
              placeholder="Create Todo..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onClick={() => setShowCommentField(true)}
              onKeyDown={handleKeyDown}
            />

            <button
              className="absolute right-2 top-2 outline-none px-2 py-1 font-medium text-white rounded-full hover:bg-[#726AB1] transition-all"
              onClick={createNewTodo}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>

            <div className={`comment-field ${showCommentField ? "open" : ""}`}>
              <textarea
                type="text"
                className="text-sm w-full bg-[#373a55] mt-3 text-white rounded-xl outline-none p-2"
                placeholder="Comment..."
                name=""
                rows="1"
                value={newTextContent}
                onChange={(e) => setNewTextContent(e.target.value)}
                onKeyDown={handleKeyDown}
              ></textarea>
            </div>

            {error && <p className="text-red-600 text-xs pt-3">{error}</p>}
          </div>
        </div>
      </div>

      <div className="flex mt-[5.6rem] flex-col items-center w-full px-10 max-900:px-4 max-500:px-1 max-385:px-0">
        <div className="max-h-[calc(90vh-8rem)] px-4 overflow-y-auto w-full max-w-[82rem] relative">
          {activeTodos.length > 0 ? (
            <div className="grid grid-cols-1 gap-1">
              {activeTodos.map((todo) => (
                <TodoWidget
                  key={todo._id}
                  {...todo}
                  editTodo={() => editHandler(todo)}
                  deleteTodo={() => deleteTodoHandler(todo)}
                  pinnedTodo={() => pinnedHandler(todo)}
                  markCompleted={() => markCompleted(todo._id)}
                  markUncompleted={() => markUncompleted(todo._id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex max-500:mt-2 flex-col justify-center items-center mx-auto mt-12">
              <img className="w-72" src={todosEmoji} alt="" />
              <span className="-mt-2 text-center">
                Create your first <b>Todo!</b> Just click the <b>Create Todo</b>{" "}
                Field below. <br />
                Organise, plan and be creative by writing <b>Todos!</b>
              </span>
            </div>
          )}

          {completedTodos.length > 0 && (
            <div className="mt-6 relative">
              <div className="flex flex-col items-start w-full">
                <span className="text-xs text-[#414563] border border-[#414563] p-2 rounded-md mb-3">
                  Completed Todos
                </span>
                <div className="grid w-full grid-cols-1 gap-1">
                  {completedTodos.map((todo) => (
                    <TodoWidget
                      key={todo._id}
                      {...todo}
                      editTodo={() => editHandler(todo)}
                      deleteTodo={() => deleteTodoHandler(todo)}
                      pinnedTodo={() => pinnedHandler(todo)}
                      markCompleted={() => markCompleted(todo._id)}
                      markUncompleted={() => markUncompleted(todo._id)}
                      isCompleted={true}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showOpenEditAddModal.isShown}
        onRequestClose={() =>
          setShowOpenEditAddModal({
            isShown: false,
            type: "add",
            data: null,
          })
        }
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
        className="absolute max-1350:w-[42rem] max-1060:w-[39rem] max-870:w-[37rem] max-730:w-[32rem] max-650:w-[28rem] max-580:w-[25rem] max-500:w-[23rem] max-420:w-[21rem] max-385:w-[19rem] max-350:w-[18rem] max-327:w-[17rem] max-307:w-[16rem] outline-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 max-h-3/4 bg-[#191A27] rounded-lg p-6 overflow-y-auto z-50"
        contentLabel="Edit or Add Todo Modal"
      >
        <EditAndAddTodos
          onClose={() =>
            setShowOpenEditAddModal({
              isShown: false,
              type: "add",
              data: null,
            })
          }
          type={showOpenEditAddModal.type}
          dataOfTodo={showOpenEditAddModal.data}
          getAllTodos={getAllTodos}
        />
      </Modal>
    </>
  );
}
