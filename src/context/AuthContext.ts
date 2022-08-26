import { createContext } from "react";

export const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: async (email: string, password: string) => {},
  init: () => {},
  clear: () => {},
});
