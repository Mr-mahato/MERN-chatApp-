import React from "react";
import Landing from "./Layout/Landing";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import PageNotFound from "./component/PageNotFound";
import { RoomsContextProvider } from "./context/RoomsContext";
import { useAuth } from "./context/AuthContext";

// Protected Route Component
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

function App() {
  return (
    <RoomsContextProvider>
      <div className="w-full">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />}>
            <Route index element={<Home />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/chat" element={<Chat />} />
              {/* Add other protected routes here */}
            </Route>
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </RoomsContextProvider>
  );
}

export default App;
