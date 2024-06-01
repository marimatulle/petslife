import React, { useEffect, useState } from "react";
import Topbar from "../bars/Topbar";
import { auth, database, storage } from "../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import PetsBarAndButton from "../bars/PetsBarAndButton";
import { FaDog, FaCat } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

const Cards = () => {
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      let docRef = doc(database, "RegularUsers", user.uid);
      let docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
      }

      const cardCollection = collection(database, "Cards");
      const cardSnapshot = await getDocs(cardCollection);
      const cardList = cardSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCards(cardList);
    });
  }, []);

  const handleImageUpload = (e, card) => {
    setSelectedImage(e.target.files[0]);
    setIsLoading(true);
    const uploadTask = uploadBytesResumable(
      ref(storage, `cards/${card.id}`),
      selectedImage
    );

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error(error);
        setIsLoading(false);
        toast.error("Erro ao carregar imagem", {
          position: "bottom-center",
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          card.photoURL = downloadURL;
          setIsLoading(false);
        });
      }
    );
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
              className="border border-gray-300 p-4 rounded-lg bg-white shadow"
            >
              <div className="flex justify-center">
                <label className="relative cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, card)}
                  />
                  {isLoading ? (
                    <ClipLoader color="#fb923c" loading={isLoading} size={50} />
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
                <strong>Idade:</strong> {card.animalAge}
              </p>
              <p>
                <strong>Cor:</strong> {card.animalColor}
              </p>
              <p>
                <strong>Doenças pré-existentes:</strong>{" "}
                {card.preExistingIllnesses}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;