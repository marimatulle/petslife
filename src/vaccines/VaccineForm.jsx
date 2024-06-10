import React, { useState } from "react";
import InputMask from "react-input-mask";
import { storage } from "../firebase";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../firebase";
import { toast } from "react-toastify";
import Input from "../components/Input";

const VaccineForm = ({ fetchVaccines, card, toggleForm }) => {
  const [vaccineURL, setVaccineURL] = useState("");
  const [vaccineName, setVaccineName] = useState("");
  const [vaccineDate, setVaccineDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [veterinary, setVeterinary] = useState("");
  const [crmv, setCrmv] = useState("");

  const addVaccine = async () => {
    try {
      await addDoc(collection(database, "Vaccines"), {
        cardId: card.id,
        vaccineURL,
        vaccineName,
        vaccineDate,
        returnDate,
        veterinary,
        crmv,
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

  const checkForm = () => {
    return vaccineName && vaccineURL && vaccineDate && veterinary && crmv;
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
        getDownloadURL(uploadTask.snapshot.ref).then(setVaccineURL);
      }
    );
  };

  return (
    <div className="flex flex-col px-2">
      <Input
        title="Vacina"
        placeholder="Nome da vacina"
        type="text"
        value={vaccineName}
        onChange={(event) => setVaccineName(event.target.value)}
        required
      />
      <Input
        title="Data da vacina"
        placeholder="DD/MM/YYYY"
        type="date"
        value={vaccineDate}
        onChange={(event) => setVaccineDate(event.target.value)}
        required
      />
      <Input
        title="Data de retorno"
        placeholder="DD/MM/YYYY"
        type="date"
        value={returnDate}
        onChange={(event) => setReturnDate(event.target.value)}
        required
      />
      <Input
        title="Veterinário Responsável"
        placeholder="Veterinário Responsável"
        type="text"
        value={veterinary}
        onChange={(event) => setVeterinary(event.target.value)}
        required
      />
      <Input
        title="CRMV"
        subtitle="UF-00000"
        mask="aa-99999"
        placeholder="CRMV"
        onChange={(event) => setCrmv(event.target.value)}
        required
      />
      <label className="mt-8 ">
        <input
          className="h-full position-absolute top-0 left-0 cursor-pointer"
          type="file"
          onChange={(event) => handleImageUpload(event)}
        />
      </label>
      <div className="mt-8">
        <button
          onClick={addVaccine}
          disabled={!checkForm()}
          type="button"
          className="w-20 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-orange-300 hover:bg-orange-400 text-white text-lg font-bold my-4"
        >
          Salvar
        </button>
      </div>
    </div>
  );
};

export default VaccineForm;
