import React from "react";
import { IoClose } from "react-icons/io5";

const CreateCardsModal = ({ onClose }) => {
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
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-bold text-gray-900"
                  id="modal-title"
                >
                  Criar nova carteira:
                </h3>
              </div>
              <button
                onClick={onClose}
                className="absolute top-0 right-0 m-2 bg-red-500 hover:bg-red-600 text-white rounded w-8 h-8 flex items-center justify-center"
              >
                <IoClose size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCardsModal;