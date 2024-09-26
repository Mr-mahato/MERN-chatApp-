import React, { useContext, useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { BsSendFill } from "react-icons/bs";
import { SocketContext } from "../context/SocketContext";
import Header from "./Header";

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
      socket.emit("subscribe", { roomid, name: state.name });
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
      socket.on("user_joined", handelUserJoined);
      socket.on("receive_message", handleReceiveMsg);
    }

    // clean up function to free the memory
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
    // updating the message of own room
    setMessageList((list) => [...list, data]);

    setCurrentMssg("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [list]);

  const messageList = list.map((val, ind) => {
    if (val.system) {
      return (
        <h1 className="text-2xl text-neutral-100 py-2 w-full sm:w-[50%] md:w-[40%] lg:w-[30%] bg-neutral-600 text-center  rounded-md mx-auto">
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
    <div
      className="bg-neutral-500 flex bg-fixed flex-col w-full min-h-screen justify-between"
      style={{
        backgroundImage: `url('https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg')`,
      }}
    >
      {/* header here */}
      <Header list={list} setMessageList={setMessageList} state={state} />

      <div className="z-20  w-full mx-auto py-2 overflow-y-auto px-3">
        {messageList}
        <div ref={messagesEndRef} />
      </div>

      {/* input box for typing message */}
      <div className="sticky w-full bottom-0 z-20 bg-neutral-600">
        <div className="px-2 bg-fixed flex gap-2  py-2">
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
    </div>
  );
}

export default Chat;
