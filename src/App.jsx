import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login/Login';
import Register from './register/Register';
import Home from './home/Home';
import Cards from './cards/Cards';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cards" element={<Cards />} />
      </Routes>
  );
};

export default App;