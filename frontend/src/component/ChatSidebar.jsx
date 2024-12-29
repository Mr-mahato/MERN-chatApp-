import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useSocket } from "../context/SocketContext";
import { useRoomContext } from "../context/RoomsContext";
import { useAuth } from "../context/AuthContext";
function ChatSidebar() {
  const [searchUser, setSearchUser] = useState("");
  const { user } = useAuth();
  const {
    setActiveRooms,
    activeRooms,
    setCurrentRoom,
    currentRoom,
    onlineUser,
    setOnlineUser,
    isChannel,
    setIsChannel,
    receiverSocketId,
    setReceiverSocketId,
  } = useRoomContext();
  const { socketRef } = useSocket();

  useEffect(() => {
    socketRef.current.on("online users", (users) => {
      setOnlineUser(users);
    });
  }, [socketRef, setOnlineUser]);

  // adding room to the socket rooms
  const addRoom = () => {
    const roomName = Math.floor(Math.random() * 100) + " getalone";
    //  send two thing here roomname and the user who created the room owner
    const roomDetail = {
      roomName,
      owner: user._id,
    };
    socketRef.current.emit("joinRoom", roomDetail);
    // if server emit the allRoom then to get all the rooms
  };
  return (
    <div className="w-[20%] border p-2 rounded-md">
      {/* searching for the user in the search bar */}
      <div className="w-full mb-4 border rounded-md flex ">
        <input
          type="text"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          placeholder="Enter your search query..."
          className="p-2 outline-none  w-full rounded-md text-neutral-600  "
        />
        <Search className="self-center basis-10 text-neutral-600 w-6 h-6" />
      </div>

      <aside className="w-full h-full flex flex-col gap-2 items-center">
        {/* rooms section */}
        <h1 className="bg-gray-600 w-full text-center p-2 text-neutral-300 font-semibold rounded-md">
          Rooms
        </h1>
        {/* selecting particular room and sending the message to that room */}
        {activeRooms.map((val) => {
          return (
            <div
              key={val.name}
              onClick={() => {
                setIsChannel(true);
                setCurrentRoom(val);
              }}
              className={`flex cursor-pointer hover:border ${
                currentRoom.name == val.name ? "border border-blue-600" : ""
              } rounded-md gap-2  w-[90%]  p-4`}
            >
              <h1 className="font-semibold text-neutral-600">#{val.name}</h1>
            </div>
          );
        })}

        <button
          onClick={addRoom}
          className="self-start p-2 border rounded-md border-blue-400 text-blue-400 font-semibold px-4 "
        >
          + Add Room
        </button>

        <h1 className="bg-gray-600 w-full text-center p-2 text-neutral-300 font-semibold rounded-md">
          Direct Message
        </h1>
        {/* this is for sending the direct message */}
        {onlineUser.map((val) => {
           if (user._id === val.userId) {
            return null; // Skip rendering if the user_id equals val.userId
          }
          return (
            <div
              onClick={() => {
                setReceiverSocketId(val);
                // setCurrentRoom({});
                setIsChannel(false);
              }}
              className={`flex cursor-pointer hover:border ${
                receiverSocketId.socketId == val.socketId
                  ? "border border-gray-600"
                  : ""
              }  rounded-md gap-2  w-[90%]  p-4`}
            >
              <h1 className="font-semibold text-neutral-600">{val.username}</h1>
            </div>
          );
        })}
      </aside>
    </div>
  );
}

export default ChatSidebar;
