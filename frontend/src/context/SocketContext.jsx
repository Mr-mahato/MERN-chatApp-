import {  createContext, useState,useEffect } from "react";

export const SocketContext = createContext();



export const SocketProvider = ({children}) =>{
   const [socket , setSocket] = useState(null);

    return(
        <SocketContext.Provider value={{socket,setSocket}} >
            {children}
        </SocketContext.Provider>
    )
}
