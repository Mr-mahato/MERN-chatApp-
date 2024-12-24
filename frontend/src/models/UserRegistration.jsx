import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "../component/AuthForm";

function UserRegistration({ isOpenRegistration, onClose, children }) {
  if (!isOpenRegistration) return null;
  const [isLogin, setIsLogin] = useState(true);
  const handleModelClose = (e) => {
    if (e.target.classList.contains("isUserRegister")) {
      onClose();
    }
  };
  return (
    <div
      onClick={handleModelClose}
      className="fixed isUserRegister top-0 w-full h-full  flex justify-center items-center bg-black/50"
    >
      <div className=" w-[34%] p-4 rounded-md    bg-white">{children}</div>
    </div>
  );
}

export default UserRegistration;
