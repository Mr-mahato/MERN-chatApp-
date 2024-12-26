import React from "react";
import ChatSidebar from "../component/ChatSidebar";
import MessageArea from "../component/MessageArea";

function Chat() {
  return (
    <div className="px-10 py-4">
      <div className="flex h-[90vh]">
        <ChatSidebar className="h-full" />
        <MessageArea className="h-full" />
      </div>
    </div>
  );
}

export default Chat;
