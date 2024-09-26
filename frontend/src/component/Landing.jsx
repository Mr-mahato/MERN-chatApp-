import React, { useContext, useEffect, useState } from "react";
import bgVideo from "../assets/bgVideo.mp4";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
function Landing() {
  const navigate = useNavigate();
  const [model, setShowModel] = useState(false);
  const { socket, setSocket } = useContext(SocketContext);
  const [user, setUser] = useState({
    username: "",
    roomNo: "",
  });
  const handelFormChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handelNewUser = async () => {
    // this is my client and will match to the server url
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);
    try {
      setUser({
        username: "",
        roomNo: "",
      });

      navigate(`/${user.roomNo}`, {
        state: {
          name: user.username,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full ">
      <div className="h-full">
        <video src={bgVideo} autoPlay loop muted></video>
      </div>
      {/* this is the navbar */}
      <div className="absolute top-0 min-h-screen bg-neutral-300/10">
        <nav className="flex px-4 justify-between ">
          <div className="self-center left">
            <h1 className="text-2xl font-bold text-yellow-500">KuraKani</h1>
          </div>

          <div className="right-side ">
            <button className="text-md tex-neutral-600 bg-cyan-300 rounded-md px-4 py-3">
              Random Fact
            </button>
          </div>
        </nav>

        {/* this is the center text */}
        <div className="flex w-full min-h-screen justify-center items-center">
          <div className="center body text-center w-1/2 p-6">
            <p className="text-neutral-100 font-bold  text-lg">
              A place where your identity is hidden be anynomous and talk to
              whom ever you want. Privacy is the most valuable that we care. Its
              the place where you meet the one who is like your ownself who is
              ready to talk to you and you are free. Be a free soul
            </p>

            <button
              onClick={() => setShowModel(!model)}
              className="bg-green-200 px-4 py-2 mt-10 rounded-md hover:bg-green-400"
            >
              Get Started
            </button>
          </div>
        </div>

        {model && (
          <div className="fixed inset-0 z-20 flex  items-center justify-center bg-black bg-opacity-70 ">
            <div className="flex items-center justify-center bg-neutral-300/20 rounded-md  border-2 w-[20rem] h-[20rem]">
              <div className="flex flex-col p-2 gap-4">
                <input
                  className="outline-none px-4 py-2 rounded bg-neutral-300 placeholder:text-neutral-700 text-neutral-600"
                  type="text"
                  placeholder="Enter your name..."
                  name="username"
                  value={user.username}
                  onChange={handelFormChange}
                />
                <input
                  type="text"
                  className="outline-none px-4 py-2 rounded bg-neutral-300 placeholder:text-neutral-700 text-neutral-600"
                  placeholder="Enter your romm..."
                  name="roomNo"
                  value={user.roomNo}
                  onChange={handelFormChange}
                />
                <button
                  onClick={() => handelNewUser()}
                  type="submit"
                  className="bg-[#65a30d] text-neutral-900 font-semibold hover:bg-[#65a30d]/90 self-end px-3 py-2 rounded-md"
                >
                  Enter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Landing;
