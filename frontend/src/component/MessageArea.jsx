import React, { useEffect, useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";
import dayjs from "dayjs";
import { useSocket } from "../context/SocketContext";
import { useRoomContext } from "../context/RoomsContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
function MessageArea() {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState({});
  const [directMessages, setDirectMessages] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const chatSectionRef = useRef();
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
    socketRef.current.on("new message", ({ payload, chatName }) => {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [chatName]: [...(prevMessages[chatName] || []), payload],
      }));
    });
    // handeling the private messages
    socketRef.current.on("private_message", (message) => {
      setDirectMessages((prevMessages) => ({
        ...prevMessages,
        [message.sender]: [...(prevMessages[message.sender] || []), message],
      }));
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
    chatSectionRef.current.scroll({
      top: chatSectionRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, directMessages]);

  useEffect(() => {
    inputRef.current.focus();
  }, [currentRoom]);

  const fetchPrivateChat = async(sender_id, receiver_id) => {
    try {
      const {data} = await axios.get(`http://localhost:3001/api/v1/directmessage/${sender_id}/${receiver_id}`);
      
      if (data.success && data.data.messages) {
        // Transform messages into the format your UI expects
        const formattedMessages = data.data.messages.map(msg => ({
          sender: msg.sender_id.username,  // Using populated username from sender_id
          message: msg.content,
          timestamp: msg.timestamp,
          messageId: msg._id
        }));

        // Set messages for this conversation
        setDirectMessages(prevMessages => ({
          ...prevMessages,
          [receiverSocketId.username]: formattedMessages
        }));
      }
      
    } catch (error) {
      console.log("Error while receiving the private messages:", error);
    }
  };

  // Update your useEffect to fetch messages when switching to direct messages
  useEffect(() => {
    if (!isChannel && receiverSocketId?.userId) {
      fetchPrivateChat(user._id, receiverSocketId.userId);
    }
  }, [isChannel, receiverSocketId]);

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
        userId: user._id,
        roomId: currentRoom._id,
      };
      socketRef.current.emit("send message", {
        payload,
        isChannel,
        chatName: currentRoom.name,
      });
    } else {
      // trying to send the private message
      setDirectMessages((prevMessages) => ({
        ...prevMessages,
        [receiverSocketId.username]: [
          ...(prevMessages[receiverSocketId.username] || []),
          { sender: user.username, message: userMessage },
        ],
      }));
      socketRef.current.emit("private message", {
        sender: user._id,
        receiver: receiverSocketId.userId,
        message: userMessage,
        senderName:user.username
      }); // sender --> userLoged name
    }
    setUserMessage("");
    inputRef.current.focus();
  };
  const renderMessages = () => {
    if (isChannel) {
      return (messages[currentRoom?.name] || []).map((msg, index) => (
        <div key={index} className={`p-2 flex flex-col ${msg.userId === user._id ? 'items-end' : 'items-start'}`}>
          <div className={`max-w-[70%] ${msg.userId === user._id ? 'bg-blue-500 text-white' : 'bg-gray-100'} rounded-lg p-3`}>
            <div className="flex items-center gap-2 mb-1">
              <h1 className={`font-semibold ${msg.userId === user._id ? 'text-white' : 'text-gray-700'}`}>
                {msg.username}
              </h1>
              <span className={`text-xs ${msg.userId === user._id ? 'text-blue-100' : 'text-gray-500'}`}>
                {dayjs(msg.timestamp).format('hh:mm A')}
              </span>
            </div>
            <p className="break-words">{msg.content}</p>
          </div>
        </div>
      ));
    } else {
      return (directMessages[receiverSocketId.username] || []).map((msg, index) => (
        <div key={index} className={`p-2 flex flex-col ${msg.sender === user.username ? 'items-end' : 'items-start'}`}>
          <div className={`max-w-[70%] ${
            msg.sender === user.username ? 'bg-blue-500 text-white' : 'bg-gray-100'
          } rounded-lg p-3`}>
            <div className="flex items-center gap-2 mb-1">
              <h1 className={`font-semibold ${
                msg.sender === user.username ? 'text-white' : 'text-gray-700'
              }`}>
                {msg.sender}
              </h1>
              <span className={`text-xs ${
                msg.sender === user.username ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {dayjs(msg.timestamp).format('hh:mm A')}
              </span>
            </div>
            <p className="break-words">{msg.message}</p>
          </div>
        </div>
      ));
    }
  };

  const fetchMessages = async (roomId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:3001/api/v1/getroomchat/${currentRoom._id}`
      );


      // Update messages state with fetched messages
      setMessages((prevMessages) => ({
        ...prevMessages,
        [currentRoom.name]: data.data.messages,
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentRoom?._id) {
      fetchMessages(currentRoom._id);
    }
  }, [currentRoom]);

  return (
    <div className="w-full h-full border p-2 flex flex-col justify-between">
      {/* upper part where there is gonna be the info of the user */}
      <div className="flex gap-2 items-center bg-gray-600 border rounded-md p-3 mb-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR92SteKCmoJpBh3GlakGipEznqeWRH2NyfpA&s"
          alt="user image"
          className="w-[2rem] h-[2rem] rounded-full border"
        />
        <h1 className="font-semibold text-neutral-100">
          {isChannel ? `#${currentRoom.name}` : receiverSocketId.username}
        </h1>
      </div>

      {/* main chat inbox part */}
      <div 
        ref={chatSectionRef} 
        className="flex-grow overflow-y-auto px-4 space-y-2"
      >
        {renderMessages()}
      </div>

      {/* input area */}
      <div className="flex items-center gap-2 border-t pt-4 mt-4">
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
          className="flex-grow p-3 border rounded-lg outline-none focus:border-blue-500"
          ref={inputRef}
        />
        <button
          onClick={handleMessageSend}
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <SendHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default MessageArea;
