import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  userId: "",
  userName: "",
  role: "",
  isLoggedIn: false,
  login: (token, userId, userName, role) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initToken = localStorage.getItem("token");
  const initUserId = localStorage.getItem("userId");
  const initUserName = localStorage.getItem("userName");
  const initRole = localStorage.getItem("role");
  const [token, setToken] = useState(initToken);
  const [userId, setUserId] = useState(initUserId);
  const [userName, setUserName] = useState(initUserName);
  const [role, setRole] = useState(initRole);
  const isUserLoggedIn = !!token;

  const loginHandler = (token, userId, userName, role) => {
    setToken(token);
    setUserId(userId);
    setUserName(userName);
    setRole(role);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
    localStorage.setItem("role", role);
  };
  const logoutHandler = () => {
    setToken(null);
    setUserId(null);
    setUserName(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
  };
  const contextValue = {
    token: token,
    userId: userId,
    userName: userName,
    role: role,
    isLoggedIn: isUserLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
