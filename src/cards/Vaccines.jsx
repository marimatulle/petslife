import React, { useState, useEffect } from "react";
import { IoClose, IoArrowForward, IoArrowBack } from "react-icons/io5";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase";
import VaccineForm from "./VaccineForm";
import VaccineGrid from "./VaccineGrid";

const CardsModal = ({ onClose, card, isVet }) => {
  const [vaccines, setVaccines] = useState([]);
  const [showForm, toggleForm] = useState(false);

  useEffect(() => {
    fetchVaccines();
  }, []);

  const fetchVaccines = async () => {
    const vaccinesCollection = collection(database, "Vaccines");
    const vaccinesSnapshot = await getDocs(vaccinesCollection);
    const vaccinesList = vaccinesSnapshot.docs
      .map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      .filter((vaccine) => vaccine.cardId === card.id);
    setVaccines(vaccinesList);
  };

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ></span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-auto mx-auto sm:my-8 sm:align-middle w-full sm:max-w-lg">
          <div className="bg-white h-[400px] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3
                  className="text-lg leading-6 font-bold text-gray-900"
                  id="modal-title"
                >
                  Vacinas:
                </h3>
                {isVet && (
                  <button onClick={() => toggleForm(true)}>
                    Adicionar Vacina
                  </button>
                )}
                {showForm ? (
                  <VaccineForm
                    card={card}
                    fetchVaccines={fetchVaccines}
                    toggleForm={() => toggleForm(false)}
                  />
                ) : (
                  <VaccineGrid vaccines={vaccines} />
                )}
              </div>
              <button
                onClick={onClose}
                className="absolute top-0 right-0 m-2 bg-red-500 hover:bg-red-600 text-white rounded w-8 h-8 flex items-center justify-center"
              >
                <IoClose size={24} />
              </button>
              <button className="absolute top-1/2 left-0 transform -translate-y-1/2 m-2 bg-orange-300 hover:bg-orange-400 text-white rounded w-8 h-8 flex items-center justify-center">
                <IoArrowBack size={24} />
              </button>
              <button className="absolute top-1/2 right-0 transform -translate-y-1/2 m-2 bg-orange-300 hover:bg-orange-400 text-white rounded w-8 h-8 flex items-center justify-center">
                <IoArrowForward size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsModal;
