import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputPassword from "./inputFields/InputPassword";
import axiosCall from "../utils/axiosInst";
import loginRegisterBgEl from "../images/bg_element_login_registration.png";
import loginRegisterEmoji from "../images/emoji_login_registration.png";
import appLogo from "../images/logo_studentify.png";

export default function Registration({ setIsAuthenticated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const emailValidation = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const registrationHandler = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please type in your Name");
      return;
    }

    if (!emailValidation(email)) {
      setError("Please type in a valid Email");
      return;
    }

    if (!password) {
      setError("Please type in a valid Password");
      return;
    }

    setError("");

    try {
      const response = await axiosCall.post("/create-account", {
        username: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.secretToken) {
        localStorage.setItem("token", response.data.secretToken);
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred, Please try it again.");
      }
    }
  };

  return (
    <div>
      <div className="max-580:hidden max-1200:mt-[8.5rem] max-580:mt-[10rem] max-385:mt-[10.5rem] w-full max-1060:flex-col max-1060:justify-center max-1060:items-center absolute mt-14 top-0 left-1/2 transform -translate-x-1/2 pb-1 flex items-end justify-center mb-12">
        <img
          src={appLogo}
          className="max-580:w-[21rem] max-385:w-[17.5rem] max-327:w-[15.5rem] max-350:w-[16.5rem] max-465:w-[19rem] w-[23rem] max-1060:ml-8 mr-3"
          alt=""
        />
        <h1 className="max-580:text-2xl max-385:text-xl max-327:w-[15.5rem] max-350:w-[16.5rem] max-465:w-[19rem]">
          Your study helper.
        </h1>
      </div>
      <div className="flex flex-col items-center h-[100vh] w-[100vw] justify-center">
        <img
          src={loginRegisterBgEl}
          alt=""
          className="fixed -bottom-[2rem] -left-[24rem] max-1250:w-[82.5rem] max-960:w-[75rem] max-730:w-[58rem] max-650:w-[56rem] max-580:w-[56rem] max-500:w-[55.5rem] max-385:w-[51rem] z-[-50] max-w-[63rem] overflow-hidden pl-16 pr-16"
        />

        <div className="flex mt-[11.7rem] max-580:mt-0">
          <div className="max-w-96 h-[25.2rem] max-385:mx-5 max-465:mx-7 max-1200:mt-0 bg-[#2D3046] rounded px-7 py-10">
            <form onSubmit={registrationHandler} action="">
              <h3 className="text-2xl text-white font-medium mb-7">Register</h3>

              <input
                className="w-full text-white bg-[#4c506e] text-sm px-5 py-3 rounded mb-4 outline-none"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="w-full text-white text-sm bg-[#4c506e] px-5 py-3 rounded mb-4 outline-none"
                type="text"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <InputPassword
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className="text-red-600 text-xs pb-4">{error}</p>}

              <button className="w-full text-sm bg-[#9D95DD] text-white p-2 rounded hover:bg-[#b6adee]">
                Create an Account
              </button>

              <p className="text-sm text-white text-center mt-4">
                You already have an Account?{" "}
                <Link
                  className="primary-text font-medium underline"
                  to="/login"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
          <img
            src={loginRegisterEmoji}
            alt=""
            className="w-[31rem] max-1200:hidden ml-32"
          />
        </div>
      </div>
    </div>
  );
}
