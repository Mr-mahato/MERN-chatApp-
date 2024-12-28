import React, { useEffect, useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";
import dayjs from "dayjs";
import { useSocket } from "../context/SocketContext";
import { useRoomContext } from "../context/RoomsContext";
import { useAuth } from "../context/AuthContext";

function MessageArea() {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState({});
  const [directMessages, setDirectMessages] = useState({});
  const { user } = useAuth();
  const {
    activeRooms,
    setActiveRooms,
    currentRoom,
    setCurrentRoom,
    setOnlineUser,
    isChannel,
    receiverSocketId,
    setIsChannel,
  } = useRoomContext();
  const inputRef = useRef();
  const { socketRef } = useSocket();
  // first when user comes join the room called general

  useEffect(() => {
    socketRef.current.emit("joinRoom", {
      roomName: currentRoom.name,
      owner: user._id,
    });

    socketRef.current.emit("authenticate", user._id); // letting the user to have the username and the socket id
    // new message incoming from the user
    socketRef.current.on("new message", (message) => {
      console.log("New incoming messages", message);
      console.log("isChannel true");
      setMessages((prevMessages) => ({
        ...prevMessages,
        [message.roomName]: [
          ...(prevMessages[message.roomName] || []),
          message,
        ],
      }));

      // console.log(
      //   "isChannel false message being send fromt the server",
      //   message
      // );
      // console.log(directMessages, receiverSocketId);
      // setDirectMessages((prevMessages) => ({
      //   ...prevMessages,
      //   [message.sender]: [...(prevMessages[message.sender] || []), message],
      // }));
    });
    socketRef.current.on("private_message", (message) => {
      console.log("isChannel false message being send from the server, :" , message);
      console.log(directMessages , receiverSocketId);
      setDirectMessages((prevMessages) =>({
        ...prevMessages,
        [message.sender]:[...(prevMessages[message.sender] || []) , message]
      }))
    });

    socketRef.current.on("activeRooms", (rooms) => {
      setActiveRooms(rooms);
    });

    // Cleanup function to remove event listeners when component unmounts or currentRoom changes
    return () => {
      socketRef.current.off("new message");
      socketRef.current.off("connectedSockets");
      socketRef.current.off("activeRooms");
    };
  }, [currentRoom, socketRef, setActiveRooms, setOnlineUser]);

  useEffect(() => {
    inputRef.current.focus();
  }, [currentRoom]);

  const handleMessageSend = (e) => {
    // content , to , sender , chatName , isChannel
    // to --> room name (isChannel == true) or socket id (isChannel == false)
    /*
    isChannel ---> true {
    const payload = {
    content , 
    chatName,--> the roomName
    sender
    }

    socket.to(to).emit("new message" ,payload)
    }

    else 
    const payload = {
    content , 
    chatName:sender
    sender
    }

    socket.to(to).emit("new message" ,payload)
    }

    */

    const currentTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    if (userMessage.trim() === "") {
      alert("Please enter a message");
      return;
    }
    if (isChannel) {
      const payload = {
        content: userMessage,
        username: user.username,
        time: currentTime,
        isChannel,
        roomName: isChannel ? currentRoom.name : receiverSocketId,
      };
      socketRef.current.emit("send message", {
        payload,
        isChannel,
        chatName: isChannel ? currentRoom.name : receiverSocketId,
      });
    } else {
      // trying to send the private message
      setDirectMessages((prevMessages) => ({
        ...prevMessages,
        [receiverSocketId.username]: [
          ...(prevMessages[receiverSocketId.username] || []),
          {sender:user.username , message:userMessage},
        ],
      }));
      socketRef.current.emit("private message", {
        sender: user.username,
        receiver: receiverSocketId.username,
        message: userMessage,
      }); // sender --> userLoged name
    }
    setUserMessage("");
    inputRef.current.focus();
  };
  const renderMessages = () => {
    if (isChannel) {
      return (messages[currentRoom?.name] || []).map((msg, index) => (
        <div key={index} className="p-2 border-b">
          <h1 className="font-semibold text-neutral-600">{msg.username}</h1>
          {msg.content}
        </div>
      ));
    } else {
      return (directMessages[receiverSocketId.username] || []).map(
        (msg, index) => (
          <div key={index} className="p-2 border-b">
            <h1 className="font-semibold text-neutral-600">{msg.sender}</h1>
            {msg.message}
          </div>
        )
      );
    }
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
        <h1 className="font-semibold text-neutral-100">{user.username}</h1>
      </div>

      {/* main chat inbox part */}
      <div className="flex-grow overflow-y-auto">
        {/* {(messages[currentRoom?.name] || []).map((msg, index) => (
          <div key={index} className="p-2 border-b">
            <h1 className="font-semibold text-neutral-600">{msg.username}</h1>
            {msg.content}
          </div>
        ))} */}

        {renderMessages()}
      </div>

      {/* input area sending the messages*/}
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
