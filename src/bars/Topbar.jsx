import React from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaPaw, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; 

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (auth && auth.currentUser) {
        await signOut(auth);
        navigate("/login");
        toast.success("Logout feito com sucesso", {
          position: "top-center",
        });
      } else {
        console.error("Nenhum usuário está atualmente logado.");
        toast.error("Nenhum usuário está atualmente logado.", {
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Erro ao fazer logout.", {
        position: "bottom-center",
      });
    }
  };


  return (
    <div className="bg-white p-6 flex flex-col sm:flex-row justify-between items-center">
      <Navbar />
      <div className="flex flex-row sm:flex-row items-center justify-center sm:justify-end mt-4 sm:mt-0">
        <Link to="/cards">
          <button className="mb-4 sm:mb-0 mr-4 sm:mr-8 text-gray-500 text-2xl flex items-center">
            <FaPaw />
          </button>
        </Link>
        <Link to="/profile">
          <button className="mb-4 sm:mb-0 mr-4 sm:mr-8 text-gray-500 text-2xl flex items-center">
            <FaUserCircle />
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="mb-4 sm:mb-0 sm:mr-4 text-gray-500 text-2xl flex items-center"
        >
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
