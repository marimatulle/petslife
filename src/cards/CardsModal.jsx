import React from "react";
import { IoClose, IoArrowForward, IoArrowBack } from "react-icons/io5";
import { storage } from "../firebase";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";

const CardsModal = ({ onClose }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, `vaccines/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(`Arquivo disponível em: ${downloadURL}`);
        });
      }
    );
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
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3
                  className="text-lg leading-6 font-bold text-gray-900"
                  id="modal-title"
                >
                  Vacinas:
                </h3>
                <div className="mt-2">
                  <input type="file" onChange={handleImageUpload} />
                </div>
              </div>
              <button
                onClick={onClose}
                className="absolute top-0 right-0 m-2 bg-red-500 hover:bg-red-600 text-white rounded w-8 h-8 flex items-center justify-center"
              >
                <IoClose size={24} />
              </button>
              <div className="flex w-full h-full">
                <button className="absolute top-1/2 left-0 transform -translate-y-1/2 m-2 bg-orange-300 hover:bg-orange-400 text-white rounded w-8 h-8 flex items-center justify-center">
                  <IoArrowBack size={24} />
                </button>
              </div>
              <div className="flex w-full h-full">
                <button className="absolute top-1/2 right-0 transform -translate-y-1/2 m-2 bg-orange-300 hover:bg-orange-400 text-white rounded w-8 h-8 flex items-center justify-center">
                  <IoArrowForward size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsModal;
