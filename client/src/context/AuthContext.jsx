import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/auth.service";
import * as businessService from "../services/business.service";
const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const register = async (registerForm) => {
    const result = await authService.register(registerForm);
    return result;
  };

  const updateBusinessEventStatus = async (businessEvent, status) => {
    try {
      const response = await businessService.updateBusinessEventStatus(
        status,
        businessEvent._id
      );
      if (response.status === 200) {
        let newUser = { ...user };
        newUser.businessInformation.businessEvents =
          newUser.businessInformation.businessEvents.map((event) =>
            event._id.toString() == businessEvent._id.toString()
              ? { ...event, status }
              : event
          );

        newUser.businessInformation.availableDates =
          newUser.businessInformation.availableDates.filter((d) => {
            let date = new Date(d);
            let otherDate = new Date(businessEvent.date);
            return !(
              date.getDate() === otherDate.getDate() &&
              date.getMonth() === otherDate.getMonth() &&
              date.getFullYear() === otherDate.getFullYear()
            );
          });
        setUser(newUser);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateBusinessInformation = async (businessInformation, image) => {
    if (image) {
      // upload image
      const { urls } = await authService.uploadImage(image);
      businessInformation.businessImages = urls;
    }
    const { data: user } = await authService.updateBusinessInformation(
      businessInformation
    );
    setUser(user);
    return user;
  };

  const login = async (loginForm) => {
    const token = await authService.login(loginForm);
    console.log(token);
    setToken(token);
    setLoading(true);
    return token;
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          const { data: user } = await authService.me();
          console.log(user);
          setUser(user);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        register,
        login,
        updateBusinessInformation,
        loading,
        logout,
        updateBusinessEventStatus,
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
