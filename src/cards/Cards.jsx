import React, { useEffect, useState } from "react";
import Topbar from "../bars/Topbar";
import { auth, database, storage } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import PetsBarAndButton from "../bars/PetsBarAndButton";
import UpdateCardsModal from "./UpdateCardsModal";
import { FaDog, FaCat, FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

const Cards = () => {
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loadingCards, setLoadingCards] = useState({});
  const [isHovered, setIsHovered] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      let docRef = doc(database, "RegularUsers", user.uid);
      let docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
      }

      const cardCollection = collection(database, "Cards");
      const cardSnapshot = await getDocs(cardCollection);
      const cardList = cardSnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((card) => card.userUUID === user.uid);
      setCards(cardList);
    });
  }, []);

  const handleImageUpload = async (e, card) => {
    const selectedImage = e.target.files[0];
    setLoadingCards((prev) => ({ ...prev, [card.id]: true }));
    const uploadTask = uploadBytesResumable(
      ref(storage, `cards/${card.id}`),
      selectedImage
    );

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error(error);
        setLoadingCards((prev) => ({ ...prev, [card.id]: false }));
        toast.error("Erro ao carregar imagem", {
          position: "bottom-center",
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          card.photoURL = downloadURL;
          setLoadingCards((prev) => ({ ...prev, [card.id]: false }));
          const cardDocRef = doc(database, "Cards", card.id);
          setDoc(cardDocRef, { photoURL: downloadURL }, { merge: true });
        });
      }
    );
  };

  const handleDeleteCard = async (card) => {
    const cardDocRef = doc(database, "Cards", card.id);
    await deleteDoc(cardDocRef);
    setCards(cards.filter((c) => c.id !== card.id));
    toast.success("Carteira excluída com sucesso!", {
      position: "top-center",
    });
  };

  const handleEditCard = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Topbar location="/cards" />
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/4">
          <PetsBarAndButton />
        </div>
        <div className="w-full sm:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="border border-gray-300 p-4 rounded-lg bg-white shadow relative"
            >
              <button
                onClick={() => handleDeleteCard(card)}
                className="absolute top-2 left-2 text-red-500 text-lg"
              >
                <FaRegTrashAlt size={16} />
              </button>
              <button
                onClick={() => handleEditCard(card)}
                className="absolute top-2 right-2 text-orange-400 text-lg"
              >
                <FaPencilAlt size={16} />
              </button>
              <div className="flex justify-center mt-8">
                <label
                  onMouseEnter={() => setIsHovered({ [card.id]: true })}
                  onMouseLeave={() => setIsHovered({ [card.id]: false })}
                  className="relative cursor-pointer"
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, card)}
                  />
                  {loadingCards[card.id] ? (
                    <ClipLoader color="#fb923c" loading={true} size={50} />
                  ) : card.photoURL ? (
                    <img
                      className="w-24 h-24 rounded-full mx-auto"
                      src={card.photoURL}
                      alt="Avatar do pet"
                    />
                  ) : card.animalSpecies === "Cachorro" ? (
                    <FaDog className="text-gray-400 w-24 h-24 mx-auto" />
                  ) : (
                    <FaCat className="text-gray-400 w-24 h-24 mx-auto" />
                  )}
                  {isHovered[card.id] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 text-white rounded-full cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-110">
                      <span className="text-center">Alterar imagem</span>
                    </div>
                  )}
                </label>
              </div>
              <h2 className="font-bold text-xl mb-2 mt-4 text-center">
                {card.animalName}
              </h2>
              <p>
                <strong>Espécie:</strong> {card.animalSpecies}
              </p>
              <p>
                <strong>Raça:</strong> {card.animalBreed}
              </p>
              <p>
                <strong>Sexo:</strong> {card.animalSex}
              </p>
              <p>
                <strong>Idade:</strong> {card.animalAge}
              </p>
              <p>
                <strong>Cor:</strong> {card.animalColor}
              </p>
              <p>
                <strong>Castrado:</strong> {card.isNeutered}
              </p>
              <p>
                <strong>Doenças pré-existentes:</strong>{" "}
                {card.preExistingIllnesses}
              </p>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <UpdateCardsModal
          onClose={() => setIsModalOpen(false)}
          cardId={selectedCard.id}
        />
      )}
    </div>
  );
};

export default Cards;