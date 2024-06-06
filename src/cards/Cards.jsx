import React, { useEffect, useState } from "react";
import Topbar from "../bars/Topbar";
import { auth, database, storage } from "../firebase";
import {
  doc,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import PetsBarAndButton from "../bars/PetsBarAndButton";
import UpdateCardsModal from "./UpdateCardsModal";
import { toast } from "react-toastify";
import Header from "./Header";
import Image from "./Image";
import Description from "./Description";
import CardsModal from "./CardsModal";

const Cards = () => {
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [friendIds, setFriendIds] = useState([]);
  const [loadingCards, setLoadingCards] = useState({});
  const [isHovered, setIsHovered] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [shouldUpdateCards, setShouldUpdateCards] = useState(false);
  const [isCardsModalOpen, setIsCardsModalOpen] = useState(false);

  useEffect(() => {
    if (!shouldUpdateCards) return;

    fetchCards(friendIds).then(() => {
      setShouldUpdateCards(false);
    });
  }, [shouldUpdateCards, friendIds]);

  const fetchCards = async (includedIds) => {
    const cardCollection = collection(database, "Cards");
    const cardSnapshot = await getDocs(cardCollection);
    const cardList = cardSnapshot.docs
      .map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      .filter((card) => includedIds.includes(card.userUUID));
    setCards(cardList);
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      console.log({ user });
      setUser(user);

      const receivedRequestsQuery = query(
        collection(database, "FriendRequests"),
        where("receiverId", "==", auth.currentUser.uid),
        where("status", "==", "accepted")
      );
      const sentRequestsQuery = query(
        collection(database, "FriendRequests"),
        where("senderId", "==", auth.currentUser.uid),
        where("status", "==", "accepted")
      );

      const receivedRequestsSnapshot = await getDocs(receivedRequestsQuery);
      const sentRequestsSnapshot = await getDocs(sentRequestsQuery);

      const friends = [
        ...receivedRequestsSnapshot.docs.map((doc) => doc.data().senderId),
        ...sentRequestsSnapshot.docs.map((doc) => doc.data().receiverId),
        auth.currentUser.uid,
      ];

      setFriendIds(friends);

      fetchCards(friends);
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

  const checkOwnsership = (ownerId) => ownerId === user.uid;

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsCardsModalOpen(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Topbar location="/cards" />
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/4">
          <PetsBarAndButton setShouldUpdateCards={setShouldUpdateCards} />
        </div>
        <div className="w-full sm:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="border border-gray-300 p-4 rounded-lg bg-white shadow relative cursor-pointer"
              onClick={() => handleCardClick(card)}
            >
              <Header
                isOwner={checkOwnsership(card.userUUID)}
                card={card}
                handleDeleteCard={handleDeleteCard}
                handleEditCard={handleEditCard}
              />
              <Image
                card={card}
                isOwner={checkOwnsership(card.userUUID)}
                handleImageUpload={handleImageUpload}
                setIsHovered={setIsHovered}
                loadingCards={loadingCards}
                isHovered={isHovered}
              />
              <Description card={card} />
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <UpdateCardsModal
          setShouldUpdateCards={setShouldUpdateCards}
          onClose={() => setIsModalOpen(false)}
          cardId={selectedCard.id}
        />
      )}
      {isCardsModalOpen && (
        <CardsModal card={selectedCard} onClose={() => setIsCardsModalOpen(false)} />
      )}
    </div>
  );
};

export default Cards;