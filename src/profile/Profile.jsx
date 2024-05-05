import React from "react";
import Topbar from "../bars/Topbar";

const Profile = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Topbar location="/profile" />
      <div className="flex justify-center items-center h-full">
        <div className="w-full lg:w-3/4 xl:w-1/2 bg-white shadow rounded-lg p-8 m-4">
          <div className="flex justify-center">
            <img
              className="w-48 h-48 rounded-full mx-auto"
              src="avatar.png"
              alt="Avatar do usuário"
            />
          </div>
          <p className="text-center mt-3 font-bold text-2xl mb-2">
            Nome completo
          </p>
          <p className="text-center text-gray-400 text-lg">Nome de usuário</p>
          <div className="flex items-center justify-center mt-4">
            <button className="bg-orange-300 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded">
              Amigos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;