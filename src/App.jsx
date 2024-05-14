import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "./firebase";

import Login from './login/Login';
import Register from './register/Register';
import Profile from './profile/Profile';
import Cards from './cards/Cards';

const App = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user);
    });
  });
  return (
    <div>
        <Routes>
          <Route path="/" element={user?<Navigate to="/profile"/>:<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cards" element={<Cards />} />
        </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;