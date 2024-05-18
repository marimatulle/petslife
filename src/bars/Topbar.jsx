import React from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaPaw, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Topbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
    toast.success("Logout feito com sucesso", {
      position: "top-center",
    });
  };

  return (
    <div className="bg-white p-4 flex justify-between items-center">
      <Navbar />
      <div className="flex items-center">
        <Link to="/cards">
          <button className="mr-8 text-gray-500 text-2xl flex items-center">
            <FaPaw />
          </button>
        </Link>
        <Link to="/profile">
          <button className="mr-8 text-gray-500 text-2xl flex items-center">
            <FaUserCircle />
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="mr-4 text-gray-500 text-2xl flex items-center"
        >
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
};

export default Topbar;