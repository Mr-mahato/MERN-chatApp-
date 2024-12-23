import React from "react";

function UserRegistration({ isOpenRegistration, onClose }) {
  if (!isOpenRegistration) return null;
  console.log("beign called")
  return (
    <div className="min-h-screen w-full bg-black">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
        quaerat.
      </p>
      <button onClick={onClose} className="bg-red-400 p-2 rounded-md">
        close
      </button>
    </div>
  );
}

export default UserRegistration;
