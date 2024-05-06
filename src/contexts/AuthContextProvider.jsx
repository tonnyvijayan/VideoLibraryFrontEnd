import { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState("");
  const currentPersistState = JSON.parse(localStorage.getItem("persist"));
  const [persist, setPersist] = useState(currentPersistState || false);

  return (
    <AuthContext.Provider
      value={{ authState, setAuthState, persist, setPersist }}
    >
      {children}
    </AuthContext.Provider>
  );
};
