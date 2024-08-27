import {  createContext, useState,useEffect } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();



export const SocketProvider = ({children}) =>{
   const [socket , setSocket] = useState(null);
   useEffect(() => {
    const newSocket = io("http://localhost:3001"); // Update this URL to match your server URL
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);
    return(
        <SocketContext.Provider value={{socket,setSocket}} >
            {children}
        </SocketContext.Provider>
    )
}
