import React from "react";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="relative">
      <FaSearch className="absolute top-1/2 ml-2 transform -translate-y-1/2 text-gray-500 text-2xl" />
      <input
        className="w-full ml-12 border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
        type="text"
        placeholder="Buscar usuário..."
      />
    </div>
  );
};

export default Navbar;