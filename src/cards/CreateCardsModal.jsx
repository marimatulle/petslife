import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../firebase";
import { toast } from "react-toastify";

const CreateCardsModal = ({ onClose }) => {
  const [animalName, setAnimalName] = useState("");
  const [animalSpecies, setAnimalSpecies] = useState("");
  const [animalBreed, setAnimalBreed] = useState("");
  const [animalSex, setAnimalSex] = useState("");
  const [animalAge, setAnimalAge] = useState("");
  const [animalColor, setAnimalColor] = useState("");
  const [isNeutered, setIsNeutered] = useState("");
  const [preExistingIllnesses, setPreExistingIllnesses] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(database, "Cards"), {
        animalName: animalName,
        animalSpecies: animalSpecies,
        animalBreed: animalBreed,
        animalSex: animalSex,
        animalAge: animalAge,
        animalColor: animalColor,
        isNeutered: isNeutered,
        preExistingIllnesses: preExistingIllnesses,
      });
      toast.success("Carteira cadastrada com sucesso!", {
        position: "top-center",
      });
      onClose();
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Algum problema ocorreu no cadastro da carteira.", {
        position: "bottom-center",
      });
    }
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
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-bold text-gray-900"
                  id="modal-title"
                >
                  Cadastrar nova carteira:
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="text-black font-medium">
                      Nome do animal:
                    </label>
                    <input
                      className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                      placeholder="Digite o nome do animal"
                      type="text"
                      value={animalName}
                      onChange={(e) => setAnimalName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-black font-medium">
                      Espécie do animal:
                    </label>
                    <select
                      className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                      value={animalSpecies}
                      onChange={(e) => setAnimalSpecies(e.target.value)}
                      required
                    >
                      <option value="">Selecione a espécie</option>
                      <option value="Cachorro">Cachorro</option>
                      <option value="Gato">Gato</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="text-black font-medium">
                      Raça do animal:
                    </label>
                    <input
                      className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                      placeholder="Digite a raça do animal"
                      type="text"
                      value={animalBreed}
                      onChange={(e) => setAnimalBreed(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-black font-medium">
                      Sexo do animal:
                    </label>
                    <select
                      className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                      value={animalSex}
                      onChange={(e) => setAnimalSex(e.target.value)}
                      required
                    >
                      <option value="">Selecione o sexo do animal</option>
                      <option value="Macho">Macho</option>
                      <option value="Fêmea">Fêmea</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="text-black font-medium">
                      Idade do animal:
                    </label>
                    <input
                      className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                      placeholder="Digite a idade do animal"
                      type="text"
                      value={animalAge}
                      onChange={(e) => setAnimalAge(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-black font-medium">
                      Cor do animal:
                    </label>
                    <input
                      className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                      placeholder="Digite a cor do animal"
                      type="text"
                      value={animalColor}
                      onChange={(e) => setAnimalColor(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-black font-medium">
                      O animal é castrado?
                    </label>
                    <select
                      className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                      value={isNeutered}
                      onChange={(e) => setIsNeutered(e.target.value)}
                      required
                    >
                      <option value="">Selecione "Sim" ou "Não"</option>
                      <option value="Sim">Sim</option>
                      <option value="Não">Não</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="text-black font-medium">
                      Doenças pré-existentes:
                    </label>
                    <h3 className="font-bold text-gray-400">
                      Se o animal não possui nenhuma, apenas digite "Não"
                    </h3>
                    <input
                      className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                      placeholder="Digite as doenças pré-existentes do animal"
                      type="text"
                      value={preExistingIllnesses}
                      onChange={(e) => setPreExistingIllnesses(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mt-8 flex flex-col gap-y-4">
                    <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-orange-400 text-white text-lg font-bold">
                      Cadastrar
                    </button>
                  </div>
                </form>
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