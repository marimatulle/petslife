import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PetsNavbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
  <div className="relative">
    <FaSearch className="absolute top-1/2 left-8 transform -translate-y-1/2 text-gray-500 text-2xl" />
    <input
      className="w-5/8 sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/5 2xl:w-3/4 ml-16 border-2 border-gray-200 rounded-xl p-4 m-5"
      type="text"
      placeholder="Buscar pet..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyPress={handleSearch}
    />
  </div>
  )
};

export default PetsNavbar;
