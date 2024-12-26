import React, { useEffect, useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";
import { io } from "socket.io-client";
import dayjs from "dayjs";
import { useSocket } from "../context/SocketContext";

function MessageArea() {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();
  const { socketRef } = useSocket();
  useEffect(() => {
    socketRef.current.on("chat_message", (message) => {
      console.log(message);
      console.log(socketRef.current.id);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleMessageSend = (e) => {
    const currentTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    if (userMessage.trim() === "") {
      alert("Please enter a message");
      return;
    }
    const userSentMessage = {
      content: userMessage,
      userId: socketRef.current.id,
      username: socketRef.current.id, // Replace with actual username
      time: currentTime,
      roomId: "general",
    };
    socketRef.current.emit("userMessage", userSentMessage);
    setUserMessage("");
    inputRef.current.focus();
  };

  return (
    <div className="w-full h-full border p-2 flex flex-col justify-between">
      {/* upper part where there is gonna be the info of the user */}
      <div className="flex gap-2 items-center bg-gray-600 border rounded-md p-3">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR92SteKCmoJpBh3GlakGipEznqeWRH2NyfpA&s"
          alt="user image"
          className="w-[2rem] h-[2rem] rounded-full border"
        />
        <h1 className="font-semibold text-neutral-100">User name</h1>
      </div>

      {/* main chat inbox part */}
      <div className="flex-grow overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 border-b">
            <h1 className="font-semibold text-neutral-600">{msg.username}</h1>
            {msg.content}
          </div>
        ))}
      </div>

      {/* input area */}
      <div className="flex items-center border-t p-2">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleMessageSend();
            }
          }}
          className="flex-grow p-2 border rounded-md outline-none"
          ref={inputRef}
        />
        <button
          onClick={handleMessageSend}
          className="ml-2 p-2 bg-blue-500 text-white rounded-md"
        >
          <SendHorizontal />
        </button>
      </div>
    </div>
  );
}

export default MessageArea;
