import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { FaUserCircle, FaPaw, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/PETSLIFE.png";

const Topbar = ({ location }) => {
  return (
    <div className="bg-white p-4 flex justify-between items-center">
      <Navbar />
      <img src={logo} alt="Logo" className="h-20 ml-60 mr-60" />
      <div>
        {location === "/cards" ? (
          <Link to="/profile">
            <button className="mr-8 text-gray-500 text-2xl">
              <FaUserCircle />
            </button>
          </Link>
        ) : (
          <Link to="/cards">
            <button className="mr-8 text-gray-500 text-2xl">
              <FaPaw />
            </button>
          </Link>
        )}
        <button className="mr-8 text-gray-500 text-2xl">
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
};

export default Topbar;