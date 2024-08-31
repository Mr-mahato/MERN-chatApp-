import React, { useContext, useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { BsSendFill } from "react-icons/bs";
import { SocketContext } from "../context/SocketContext";
function Chat() {
  const { roomid } = useParams();
  const [currentMssg, setCurrentMssg] = useState("");
  const { socket } = useContext(SocketContext);
  const location = useLocation();
  const state = location.state;
  const [list, setMessageList] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (socket) {
      // sending roomid and name of user
      socket.emit("join_room", { roomid, name: state.name });
    }
  }, [socket, roomid, state.name]);

  useEffect(() => {
    const handleReceiveMsg = (data) => {
      console.log(data);
      // this is here to make sure ki all the client connected to the particular room received the message its like storing the others client message to the list
      setMessageList((list) => [...list, data]);
    };

    const handelUserJoined = (data) => {
      setMessageList((list) => [
        ...list,
        { message: `${data.name} has joined the chat`, system: true },
      ]);
    };
    if (socket) {
      socket.on("receive_message", handleReceiveMsg);
      socket.on("user_joined", handelUserJoined);
    }

    return () => {
      if (socket) {
        socket.off("receive_message", handleReceiveMsg);
        socket.off("user_joined", handelUserJoined);
      }
    };
  }, [socket]);

  const handelMessageSent = async (e) => {
    const data = {
      message: currentMssg,
      room: roomid,
      user: state.name,
      time: `${new Date(Date.now()).getHours()}:${new Date(
        Date.now()
      ).getMinutes()}`,
    };
    await socket.emit("send_message", data);
    // this make sure ki only the sender is apending the message to the arraylist
    setMessageList((list) => [...list, data]);

    setCurrentMssg("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [list]);

  const messageList = list.map((val, ind) => {
    if (val.system) {
      return (
        <h1 className="text-2xl text-neutral-100 py-1 bg-neutral-600 text-center w-[30%] rounded-md mx-auto">
          {val.message}
        </h1>
      );
    }
    return (
      <div key={ind} className="flex flex-col">
        <div
          className={` p-2 ${
            val.user == state.name
              ? "bg-green-800 text-white self-end w-[20rem]"
              : "bg-neutral-800 text-white self-start w-[20rem]"
          } rounded-md my-2`}
        >
          <div className="flex justify-between">
            <h1 className="text-lg font-bold">{val.user}</h1>
            <p className="text-sm">{val.time}</p>
          </div>
          <p>{val.message}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="bg-neutral-500 flex flex-col w-full min-h-screen justify-between">
      <div
        className="bg-neutral-100 min-h-[90vh]"
        style={{
          backgroundImage: `url('https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg')`,
        }}
      >
        <div
          className="w-[90%] z-20 mx-auto py-2 overflow-y-auto"
          style={{ maxHeight: "90vh" }}
        >
          {messageList}
          <div ref={messagesEndRef} />
        </div>

        {/* this is here to have littel dark bg */}
        <div className="fixed inset-0 bottom-14 bg-black/30"></div>
      </div>

      {/* input box for typing message */}
      <div className="px-2 flex gap-2  py-2">
        <input
          type="text"
          placeholder="Enter your mssg...."
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handelMessageSent(e);
            }
          }}
          value={currentMssg}
          onChange={(e) => setCurrentMssg(e.target.value)}
          className="p-3 outline-none focus:ring-2 ring-green-200 w-full rounded-md text-neutral-600 bg-neutral-200 "
        />
        <button
          onClick={(e) => handelMessageSent(e)}
          className="bg-purple-400 px-4 py-2 rounded-md"
        >
          <BsSendFill />
        </button>
      </div>
    </div>
  );
}

export default Chat;
