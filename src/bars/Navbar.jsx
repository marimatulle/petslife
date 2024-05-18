import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <div className="relative">
      <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 text-2xl" />
      <input
        className="w-3/4 sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 2xl:w-3/4 ml-12 border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
        type="text"
        placeholder="Buscar usuário..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleSearch}
      />
    </div>
  );
};

export default Navbar;