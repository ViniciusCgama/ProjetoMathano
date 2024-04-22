import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const Context = createContext();

function UserProvider({ children }) {
  const { register, authenticated, logout, login, user } = useAuth();

  return (
    <Context.Provider value={{ register, authenticated, logout, login, user }}>
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };
