import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-neutral-50">
      <div className="border bg-neutral-100 text-center rounded-md p-4">
        <h1>
          4<span className="h-2 font-bold text-red-600">0</span>4 page
        </h1>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="border p-2 flex items-center justify-center  rounded-md text-md "
        >
          <ArrowLeft size={20} />
          Go back
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
