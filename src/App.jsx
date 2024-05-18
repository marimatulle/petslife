import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./login/Login";
import Register from "./register/Register";
import Profile from "./profile/Profile";
import Cards from "./cards/Cards";
import Search from "./search/Search";
import SearchedUserProfile from "./search/SearchedUserProfile";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/search" element={<Search />} />
        <Route path="/userprofile/:userId" element={<SearchedUserProfile />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
