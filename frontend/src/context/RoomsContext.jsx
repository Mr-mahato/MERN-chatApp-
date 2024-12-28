import { createContext, useContext, useState, useEffect } from "react";
import { useSocket } from "./SocketContext";
export const RoomsContext = createContext();

export const RoomsContextProvider = ({ children }) => {
  const [activeRooms, setActiveRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({
    name: "general",
    _id: "676fb38e5b23aee5aee0abb0",
  });
  const [onlineUser, setOnlineUser] = useState([]);
  const [isChannel, setIsChannel] = useState(true);
  const [receiverSocketId, setReceiverSocketId] = useState("");

  return (
    <RoomsContext.Provider
      value={{
        activeRooms,
        setActiveRooms,
        currentRoom,
        setCurrentRoom,
        isChannel,
        setIsChannel,
        onlineUser,
        setOnlineUser,
        receiverSocketId,
        setReceiverSocketId,
      }}
    >
      {children}
    </RoomsContext.Provider>
  );
};

export const useRoomContext = () => {
  return useContext(RoomsContext);
};
