import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged, getAuth } from "firebase/auth";

import Login from "./login/Login";
import Register from "./register/Register";
import Profile from "./profile/Profile";
import Cards from "./cards/Cards";
import SearchUsers from "./search/SearchUsers";
import SearchedUserProfile from "./search/SearchedUserProfile";
import Vaccines from "./cards/Vaccines";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const persistLoggedIn = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => persistLoggedIn();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={currentUser ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/cards"
          element={currentUser ? <Cards /> : <Navigate to="/login" />}
        />
        <Route
          path="/search"
          element={currentUser ? <SearchUsers /> : <Navigate to="/login" />}
        />
        <Route
          path="/userprofile/:userId"
          element={
            currentUser ? <SearchedUserProfile /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/vaccines/:cardId"
          element={
            currentUser ? <Vaccines /> : <Navigate to="/login" />
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;