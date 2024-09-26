import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MessageCircle, User, LogOut } from "lucide-react";
import { SocketContext } from "../context/SocketContext";
function Header({ list, setMessageList, state }) {
  const { socket } = useContext(SocketContext);
  const [accountModel, setAccountModel] = useState(false);
  return (
    <div
      className="bg-neutral-200 sticky top-0 z-30  h-[4rem] px-4 flex justify-between items-center"
    >
      {/* left div */}
      <div className="flex gap-2">
        <MessageCircle size={24} strokeWidth={2} />
        <h1 className="font-bold text-xl">Kurakani</h1>
      </div>
      {/* right div */}
      <div className="flex self-center gap-2">
        <h1 className="text-sm self-center text-neutral-600">
          welcome , Jhon Doe
        </h1>
        <User
          onClick={() => setAccountModel(!accountModel)}
          className="cursor-pointer  p-2 hover:bg-neutral-300 rounded-full"
          size={40}
          strokeWidth={2}
        />
      </div>

      {accountModel && myAccount(list, setMessageList, state)}
    </div>
  );
}

function myAccount(list, setMessageList, state) {
  const { socket } = useContext(SocketContext);
  const { roomid } = useParams();
  

  const handelSocketDisconnection = async () => {
    await socket.emit("send_message", {
      message: `${state.name} left the chat`,
      system: true,
      room:roomid
    });

    // Update the message list
    setMessageList((list) => [
      ...list,
      { message: `${state.name} left the chat`, system: true },
    ]);

    // Emit the end event to disconnect the socket
    socket.emit("end");
  };

  // #TODO:Why this render two times
  // Handle client disconnect event
  socket.on("disconnect", async () => {
    alert("You have been disconnected from the server.");
  });

  return (
    <div className="absolute myAccount border flex flex-col gap-1 border-gray-400 bg-neutral-100 px-2 py-2 rounded-lg  shadow-md right-10 top-14 z-30">
      <h1 className=" border-b border-neutral-400 px-2 font-semibold">
        My Account
      </h1>
      <div className="flex gap-1 rounded hover:bg-neutral-300 p-2 cursor-pointer">
        <User />
        <h1>John Doe</h1>
      </div>
      <div
        onClick={handelSocketDisconnection}
        className="flex gap-1 rounded hover:bg-neutral-300 p-2 cursor-pointer"
      >
        <LogOut size={20} strokeWidth={2} />
        <h1>Disconnect</h1>
      </div>
    </div>
  );
}

export default Header;
