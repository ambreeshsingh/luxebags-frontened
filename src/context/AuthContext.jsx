import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [name, setName] = useState(localStorage.getItem("name"));

  const login = (userName, token) => {
    localStorage.setItem("name", userName);
    localStorage.setItem("token", token);
    setName(userName);
    // turant state update hoga
  };

  const logout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    setName(null);
  };

  return (
    <AuthContext.Provider value={{ name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}