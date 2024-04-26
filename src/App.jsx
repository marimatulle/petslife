import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './login/Login';
import Register from './register/Register';
import Profile from './profile/Profile';
import Cards from './cards/Cards';
import Friends from './friends/Friends';

const App = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;