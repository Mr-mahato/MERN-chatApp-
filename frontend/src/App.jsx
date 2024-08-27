import React from "react";
import Landing from "./component/Landing";
import { Routes, Route } from "react-router-dom";
import Chat from "./component/Chat";
function App() {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/:roomid" element={<Chat />} />

        <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
      </Routes>
    </div>
  );
}

export default App;
