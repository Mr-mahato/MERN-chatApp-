import React from "react";
import Landing from "./Layout/Landing";
import { Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
function App() {
  return (
    <div className="w-full">
      <Routes>
        <Route element={<Landing />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
