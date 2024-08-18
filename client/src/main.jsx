import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";
import { APIProvider } from "@vis.gl/react-google-maps";

import { AuthContextProvider } from "./context/AuthContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <APIProvider
    apiKey="AIzaSyDD59VHsV0oBXv9jtiuywK5urt3kI9w_Oc"
    authReferrerPolicy="origin"
    libraries={["places"]}
  >
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </APIProvider>
);

axios.defaults.baseURL = "http://localhost:5100/";

axios.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});
