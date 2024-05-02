import React from "react";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="relative">
      <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 text-2xl" />
      <input
        className="w-3/4 sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 2xl:w-3/4 ml-12 border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
        type="text"
        placeholder="Buscar usuário..."
      />
    </div>
  );
};

export default Navbar;