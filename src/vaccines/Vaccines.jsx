import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { database } from '../firebase';
import { toast } from 'react-toastify';
import { doc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import VaccineForm from './VaccineForm';
import VaccineGrid from './VaccineGrid';
import Topbar from '../bars/Topbar';

const Vaccines = () => {
  const location = useLocation();
  const { isVet, card } = location.state;

  const [vaccines, setVaccines] = useState([]);
  const [showForm, toggleForm] = useState(false);

  const updateText = showForm ? 'Voltar' : 'Adicionar Vacina';

  useEffect(() => {
    if (card) {
      fetchVaccines();
    }
  }, [card]);

  const fetchVaccines = async () => {
    const vaccinesCollection = collection(database, 'Vaccines');
    const vaccinesSnapshot = await getDocs(vaccinesCollection);
    const vaccinesList = vaccinesSnapshot.docs
      .map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      .filter((vaccine) => vaccine.cardId === card.id);
    setVaccines(vaccinesList);
  };

  const handleDelete = async (id) => {
    const vaccineDocRef = doc(database, 'Vaccines', id);
    await deleteDoc(vaccineDocRef);
    setVaccines(vaccines.filter((v) => v.id !== id));
    toast.success('Vacina excluída com sucesso!', {
      position: 'top-center',
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Topbar location="/vaccines:cardId" />
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/4">
          {isVet && (
            <button
              onClick={() => toggleForm(!showForm)}
              className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-orange-400 text-white text-lg font-bold p-2">
              {updateText}
            </button>
          )}
        </div>
        <div className="w-full sm:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {showForm ? (
            <VaccineForm
              card={card}
              fetchVaccines={fetchVaccines}
              toggleForm={() => toggleForm(false)}
            />
          ) : (
            <VaccineGrid
              vaccines={vaccines}
              handleDelete={handleDelete}
              isVet={isVet}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Vaccines;
