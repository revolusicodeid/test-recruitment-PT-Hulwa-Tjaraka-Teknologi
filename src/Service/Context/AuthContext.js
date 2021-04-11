import React, { createContext, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  
  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
    localStorage.clear();
    toast.success("Thanks for Visit");
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        user,
        setIsAuthenticated,
        setToken,
        setUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider}