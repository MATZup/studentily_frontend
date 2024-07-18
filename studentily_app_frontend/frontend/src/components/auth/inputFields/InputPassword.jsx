import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function InputPassword({ value, onChange, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full flex items-center bg-[#4c506e] text-sm px-5 py-3 rounded mb-4 outline-none">
      <input
        value={value}
        onChange={onChange}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full bg-[#4c506e] text-white text-sm outline-none"
      />
      {showPassword ? (
        <FontAwesomeIcon
          className="cursor-pointer text-[#9D95DD]"
          icon={faEye}
          onClick={() => toggleShowPassword()}
        />
      ) : (
        <FontAwesomeIcon
          className="cursor-pointer  text-[#9f9ead]"
          icon={faEyeSlash}
          onClick={() => toggleShowPassword()}
        />
      )}
    </div>
  );
}
