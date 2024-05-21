import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { database, auth } from "../firebase";
import Topbar from "../bars/Topbar";
import { FaUserCircle } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

const SearchedUserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [friendshipStatus, setFriendshipStatus] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Enviar solicitação de amizade");

  useEffect(() => {
    const fetchUser = async () => {
      const userDocRef = doc(database, "RegularUsers", userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        setUser(userDocSnap.data());
      } else {
        const userDocRef = doc(database, "Veterinarians", userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUser(userDocSnap.data());
        }
      }

      const currentUserDocRef = doc(
        database,
        "RegularUsers",
        auth.currentUser.uid
      );
      const currentUserDocSnap = await getDoc(currentUserDocRef);
      if (currentUserDocSnap.exists()) {
        setCurrentUser(currentUserDocSnap.data());
      } else {
        const currentUserDocRef = doc(
          database,
          "Veterinarians",
          auth.currentUser.uid
        );
        const currentUserDocSnap = await getDoc(currentUserDocRef);
        if (currentUserDocSnap.exists()) {
          setCurrentUser(currentUserDocSnap.data());
        }
      }
    };

    fetchUser();
  }, [userId]);

  const sendFriendRequest = async () => {
    if (
      (user?.crmv && currentUser?.crmv) ||
      (!user?.crmv && !currentUser?.crmv)
    ) {
      return;
    }

    const senderId = auth.currentUser.uid;
    const friendRequestDocRef = doc(
      database,
      "FriendRequests",
      `${senderId}_${userId}`
    );

    const friendRequestDocSnap = await getDoc(friendRequestDocRef);
    if (!friendRequestDocSnap.exists()) {
      await setDoc(friendRequestDocRef, {
        senderId,
        receiverId: userId,
        status: "pending",
      });
      setFriendshipStatus("pending");
      toast.success("Sua solicitação de amizade foi enviada com sucesso!", {
        position: "top-center",
      });
    }
  };

  const unfriend = async () => {
    const senderId = auth.currentUser.uid;
    const friendRequestDocRef = doc(
      database,
      "FriendRequests",
      `${senderId}_${userId}`
    );

    await updateDoc(friendRequestDocRef, {
      status: "rejected",
    });
    setFriendshipStatus(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Topbar location="/userprofile/:userId" />
      <div className="flex justify-center items-center h-full">
        <div className="w-full lg:w-3/4 xl:w-1/2 bg-white shadow rounded-lg p-8 m-4">
          <div className="flex justify-center">
            <label
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative"
            >
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
            {friendshipStatus === "pending" ? (
              <button
                onClick={unfriend}
                className="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
              >
                Cancelar solicitação de amizade
              </button>
            ) : (
              <button
                onClick={sendFriendRequest}
                className="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
              >
                {friendshipStatus === "pending"
                  ? "Solicitação enviada"
                  : "Enviar solicitação de amizade"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchedUserProfile;
