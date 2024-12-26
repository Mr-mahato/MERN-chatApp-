import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userHC, setUserHC] = useState({
    email: "",
    password: "",
  });
  return (
    <AuthContext.Provider value={{ userHC, setUserHC }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
