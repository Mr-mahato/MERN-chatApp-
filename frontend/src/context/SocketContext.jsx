import { createContext, useState, useEffect, useRef, useContext } from "react";
import { io } from "socket.io-client";
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = io("http://localhost:3001");

    return () => {
      socketRef.current.disconnect();
    };
  }, [socketRef]);

  return (
    <SocketContext.Provider value={{ socketRef }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
