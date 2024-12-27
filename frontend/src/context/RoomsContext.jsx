import { createContext, useContext, useState } from "react";

export const RoomsContext = createContext();

export const RoomsContextProvider = ({ children }) => {
  const [activeRooms, setActiveRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("general");
  const [onlineUser, setOnlineUser] = useState([]);
  return (
    <RoomsContext.Provider
      value={{
        activeRooms,
        setActiveRooms,
        currentRoom,
        setCurrentRoom,
        onlineUser,
        setOnlineUser,
      }}
    >
      {children}
    </RoomsContext.Provider>
  );
};

export const useRoomContext = () => {
  return useContext(RoomsContext);
};
