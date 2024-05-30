import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Topbar from "../bars/Topbar";
import CreateCardsModal from "./CreateCardsModal";
import { auth, database } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import PetsNavbar from "../bars/PetsNavbar";

const Cards = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      let docRef = doc(database, "RegularUsers", user.uid);
      let docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
      }
    });
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Topbar location="/cards" />
      <div className="flex">
        <div className="w-1/4">
          <PetsNavbar />
        </div>
        <div className="w-3/4">
          {user && (
            <button
              onClick={handleOpenModal}
              className="absolute right-0 m-5 bg-orange-300 hover:bg-orange-400 text-white rounded w-12 h-12 flex items-center justify-center text-2xl font-bold md:w-12 md:h-12 md:text-2xl" // Tornando o botão menor para computadores e posicionado à direita
            >
              <AiOutlinePlus />{" "}
            </button>
          )}
          {showModal && <CreateCardsModal onClose={handleCloseModal} />}
        </div>
      </div>
    </div>
  );
};

export default Cards;