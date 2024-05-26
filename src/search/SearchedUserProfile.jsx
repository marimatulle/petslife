import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
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

  const MAP_STATUS_TO_TEXT = {
    accepted: "Desfazer amizade",
    pending: "Cancelar solicitação de amizade",
    rejected: "Enviar solicitação de amizade",
  };

  const [buttonText, setButtonText] = useState("loading...");

  const fetchUserData = async (collectionName, id) => {
    const userDocRef = doc(database, collectionName, id);
    const userDocSnap = await getDoc(userDocRef);
    return userDocSnap.exists() ? userDocSnap.data() : null;
  };

  useEffect(() => {
    console.log("load inicial");
    const queryStatus = query(
      collection(database, "FriendRequests"),
      where("receiverId", "==", auth.currentUser.uid)
    );

    getDocs(queryStatus).then((response) => {
      const updateStatus = response.docs[0]?.data().status || "rejected";
      console.log({ status: response.docs[0]?.data().status });
      setFriendshipStatus(updateStatus);
    });
  }, []);

  

  useEffect(() => {
    const fetchUser = async () => {
      const userData =
        (await fetchUserData("RegularUsers", userId)) ||
        (await fetchUserData("Veterinarians", userId));
      setUser(userData);

      const currentUserData =
        (await fetchUserData("RegularUsers", auth.currentUser.uid)) ||
        (await fetchUserData("Veterinarians", auth.currentUser.uid));
      setCurrentUser(currentUserData);
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const friendRequestDocRef = doc(
      database,
      "FriendRequests",
      `${auth.currentUser.uid}_${userId}`
    );

    onSnapshot(friendRequestDocRef, (doc) => {
      if (doc.exists()) {
        const friendRequest = doc.data();
        setFriendshipStatus(friendRequest.status);
      }
    });
  }, [userId]);

  useEffect(() => {
    console.log({
      friendshipStatus,
    });
    setButtonText(MAP_STATUS_TO_TEXT[friendshipStatus]);
  }, [friendshipStatus]);

  const handleButtonClick = async () => {
    const senderId = auth.currentUser.uid;
    const friendRequestDocRef = doc(
      database,
      "FriendRequests",
      `${senderId}_${userId}`
    );

    if (friendshipStatus === "accepted") {
      await deleteDoc(friendRequestDocRef);
      setFriendshipStatus("rejected");
      setButtonText("Enviar solicitação de amizade");
      localStorage.setItem("buttonText", "Enviar solicitação de amizade");
      toast.success("Amizade desfeita com sucesso!", {
        position: "top-center",
      });
    } else if (friendshipStatus === "pending") {
      await deleteDoc(friendRequestDocRef);
      setFriendshipStatus("rejected");
      setButtonText("Enviar solicitação de amizade");
      localStorage.setItem("buttonText", "Enviar solicitação de amizade");
      toast.success("Solicitação de amizade cancelada com sucesso!", {
        position: "top-center",
      });
    } else {
      if (
        (user?.crmv && currentUser?.crmv) ||
        (!user?.crmv && !currentUser?.crmv)
      ) {
        return;
      }

      const friendRequestDocSnap = await getDoc(friendRequestDocRef);
      if (!friendRequestDocSnap.exists()) {
        await setDoc(friendRequestDocRef, {
          senderId,
          receiverId: userId,
          status: "pending",
        });
        setFriendshipStatus("pending");
        setButtonText("Cancelar solicitação de amizade");
        localStorage.setItem("buttonText", "Cancelar solicitação de amizade");
        toast.success("Solicitação de amizade enviada com sucesso!", {
          position: "top-center",
        });
      }
    }
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
            <button
              onClick={handleButtonClick}
              className="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchedUserProfile;
