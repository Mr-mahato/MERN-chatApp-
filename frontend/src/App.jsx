import React from "react";
import Landing from "./Layout/Landing";
import { Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import PageNotFound from "./component/PageNotFound";
import { RoomsContextProvider } from "./context/RoomsContext";
function App() {
  return (
    <RoomsContextProvider>
      <div className="w-full">
        <Routes>
          <Route element={<Landing />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </RoomsContextProvider>
  );
}

export default App;
