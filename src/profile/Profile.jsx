import React, { useEffect, useState } from "react";
import Topbar from "../bars/Topbar";
import FriendsModal from "./FriendsModal";
import { auth, database, storage } from "../firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FaUserCircle } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFriendsModal, setShowFriendsModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      auth.onAuthStateChanged(async (user) => {
        let docRef = doc(database, "RegularUsers", user.uid);
        let docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          docRef = doc(database, "Veterinarians", user.uid);
          docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUser(docSnap.data());
          }
        }
      });
    };

    fetchUser();
  }, []);

  const handleImageUpload = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  useEffect(() => {
    if (selectedImage) {
      setIsLoading(true);
      const uploadTask = uploadBytesResumable(
        ref(storage, `avatars/${auth.currentUser.uid}`),
        selectedImage
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => { },
        (error) => {
          console.error(error);
          setIsLoading(false);
          toast.error("Erro ao carregar imagem", {
            position: "top-bottom",
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUser((prevUser) => ({ ...prevUser, photoURL: downloadURL }));
            setIsLoading(false);
            const userDocRef = doc(
              database,
              user?.crmv ? "Veterinarians" : "RegularUsers",
              auth.currentUser.uid
            );
            setDoc(userDocRef, { photoURL: downloadURL }, { merge: true });
          });
        }
      );
    }
  }, [selectedImage, user?.crmv]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Topbar location="/profile" />
      <div className="flex justify-center items-center h-full">
        <div className="w-full lg:w-3/4 xl:w-1/2 bg-white shadow rounded-lg p-8 m-4">
          <div className="flex justify-center">
            <label
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative"
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              {isLoading ? (
                <ClipLoader color="#fb923c" loading={isLoading} size={150} />
              ) : user?.photoURL ? (
                <img
                  className="w-48 h-48 rounded-full mx-auto"
                  src={user.photoURL}
                  alt="Avatar do usuário"
                />
              ) : (
                <FaUserCircle className="text-gray-400 w-48 h-48 mx-auto" />
              )}
              {isHovered && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-25 text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer">
                  Alterar imagem
                </div>
              )}
            </label>
          </div>
          <p className="text-center mt-3 font-bold text-2xl mb-2">
            {user?.name}
          </p>
          <p className="text-center text-gray-400 text-lg">
            {user?.username}
            {user?.crmv ? ` (CRMV: ${user?.crmv})` : ""}
          </p>
          <div className="flex items-center justify-center mt-4 space-x-4">
            <button
              onClick={() => setShowFriendsModal(true)}
              className="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-xl active:scale-[.98]
                active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
            >
              Amigos
            </button>
          </div>
        </div>
      </div>
      {showFriendsModal && <FriendsModal onClose={() => setShowFriendsModal(false)} />}{" "}
    </div>
  );
};

export default Profile;