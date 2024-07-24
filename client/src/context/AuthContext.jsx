import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/auth.service";
const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [user, setUser] = useState();

  const register = (registerForm) => {
    const result = authService.register(registerForm);
  };

  const login = (registerForm) => {
    const token = authService.login(registerForm);
    setToken(token);
  };
  const logout = (registerForm) => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        const user = authService.me();
        setUser(user);
      };
      fetchUser();
    }
  }, [token]);
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext Not provided");
  }

  return context;
};
