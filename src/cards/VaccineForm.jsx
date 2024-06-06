import React, { useState } from "react";
import { storage } from "../firebase";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../firebase";
import { toast } from "react-toastify";

const VaccineForm = ({ fetchVaccines, card, toggleForm }) => {
  const [urlUploaded, setUrlUploaded] = useState("");
  const [vaccineDate, setVaccineDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [veterinary, setVeterinary] = useState("");
  const [crmv, setCrmv] = useState("");

  const addVaccine = async () => {
    try {
      await addDoc(collection(database, "Vaccines"), {
        cardId: card.id,
        vaccineURL: urlUploaded,
        vaccineDate: vaccineDate,
        returnDate: returnDate,
        veterinary: veterinary,
        crmv: crmv,
      });
      toast.success("Comprovante anexado com sucesso!", {
        position: "top-center",
      });
      fetchVaccines();
      toggleForm();
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Algum problema ocorreu no anexo do comprovante.", {
        position: "bottom-center",
      });
    }
  };

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
        getDownloadURL(uploadTask.snapshot.ref).then(setUrlUploaded);
      }
    );
  };

  return (
    <>
      <label className="mb-4 text-black font-medium">
        Data da Vacina:
        <input
          className="border-2 border-gray-100 rounded-xl mt-1 bg-transparent"
          placeholder="DD/MM/YYYY"
          type="text"
          value={vaccineDate}
          onChange={(event) => setVaccineDate(event.target.value)}
          required
        />
      </label>
      <label className="mb-4 text-black font-medium">
        Data de Retorno:
        <input
          className="border-2 border-gray-100 rounded-xl mt-1 bg-transparent"
          placeholder="DD/MM/YYYY"
          type="text"
          value={returnDate}
          onChange={(event) => setReturnDate(event.target.value)}
          required
        />
      </label>
      <label className="mb-4 text-black font-medium">
        Veterinário:
        <input
          className="border-2 border-gray-100 rounded-xl mt-1 bg-transparent"
          placeholder="Digite o nome do veterinário"
          type="text"
          value={veterinary}
          onChange={(event) => setVeterinary(event.target.value)}
          required
        />
      </label>
      <label className="mb-4 text-black font-medium">
        CRMV:
        <input
          className="border-2 border-gray-100 rounded-xl mt-1 bg-transparent"
          placeholder="Digite o CRMV do veterinário"
          type="text"
          value={crmv}
          onChange={(event) => setCrmv(event.target.value)}
          required
        />
      </label>
      <label>
        <input
          className="h-full position-absolute top-0 left-0 cursor-pointer"
          type="file"
          onChange={(event) => handleImageUpload(event)}
        />
      </label>
      <div className="mt-8 flex flex-col gap-y-4">
        <button
          onClick={addVaccine}
          type="button"
          className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-orange-400 text-white text-lg font-bold"
        >
          Cadastrar
        </button>
      </div>
    </>
  );
};

export default VaccineForm;
