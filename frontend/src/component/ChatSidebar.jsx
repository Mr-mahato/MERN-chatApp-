import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useSocket } from "../context/SocketContext";
import { useRoomContext } from "../context/RoomsContext";
function ChatSidebar() {
  const [searchUser, setSearchUser] = useState("");
  const {
    setActiveRooms,
    activeRooms,
    setCurrentRoom,
    currentRoom,
    onlineUser,
    setOnlineUser,
  } = useRoomContext();
  const { socketRef } = useSocket();

  useEffect(() => {
    socketRef.current.on("connectedSockets", (connectedSockets) => {
      setOnlineUser(connectedSockets);
    });
  }, [socketRef, setOnlineUser]);

  // adding room to the socket rooms
  const addRoom = () => {
    const roomName = Math.floor(Math.random() * 100) + " getalone";
    socketRef.current.emit("joinRoom", roomName);
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
        {activeRooms.map((val) => {
          console.log(val);
          return (
            <div
              onClick={() => setCurrentRoom(val)}
              className={`flex cursor-pointer hover:border ${
                currentRoom == val ? "border border-blue-600" : ""
              } rounded-md gap-2  w-[90%]  p-4`}
            >
              <h1 className="font-semibold text-neutral-600">#{val}</h1>
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
        {onlineUser.map((val) => {
          console.log(val);
          return (
            <div
              className={`flex cursor-pointer hover:border ${
                currentRoom == val ? "border border-blue-600" : ""
              } rounded-md gap-2  w-[90%]  p-4`}
            >
              <h1 className="font-semibold text-neutral-600">{val}</h1>
            </div>
          );
        })}
      </aside>
    </div>
  );
}

export default ChatSidebar;
