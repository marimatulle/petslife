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
  const currentUserId = auth.currentUser.uid;
  const { userId: otherPersonId } = useParams();
  const [user, setUser] = useState(null);
  const [friendshipStatus, setFriendshipStatus] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const STATUS = {
    friends: "accepted",
    pendingRequest: "pending",
    strangers: "rejected",
  };

  const MAP_STATUS_TO_TEXT = {
    [STATUS.friends]: "Desfazer amizade",
    [STATUS.pendingRequest]: "Cancelar solicitação de amizade",
    [STATUS.strangers]: "Enviar solicitação de amizade",
  };

  const [buttonText, setButtonText] = useState("Loading...");

  const allowsFriendship = Boolean(user?.crmv) !== Boolean(currentUser?.crmv);

  const fetchUserData = async (collectionName, id) => {
    const userDocRef = doc(database, collectionName, id);
    const userDocSnap = await getDoc(userDocRef);
    return userDocSnap.exists() ? userDocSnap.data() : null;
  };

  useEffect(() => {
    if (friendshipStatus) return;

    const queryStatus = query(
      collection(database, "FriendRequests"),
      where("receiverId", "in", [otherPersonId, currentUserId]),
      where("senderId", "in", [otherPersonId, currentUserId])
    );

    getDocs(queryStatus).then((response) => {
      const updateStatus = response.docs[0]?.data().status || STATUS.strangers;
      setFriendshipStatus(updateStatus);
    });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const userData =
        (await fetchUserData("RegularUsers", otherPersonId)) ||
        (await fetchUserData("Veterinarians", otherPersonId));
      setUser(userData);

      const currentUserData =
        (await fetchUserData("RegularUsers", auth.currentUser.uid)) ||
        (await fetchUserData("Veterinarians", auth.currentUser.uid));
      setCurrentUser(currentUserData);
    };

    fetchUser();
  }, [otherPersonId]);

  useEffect(() => {
    const friendRequestDocRef = doc(
      database,
      "FriendRequests",
      `${auth.currentUser.uid}_${otherPersonId}`
    );

    onSnapshot(friendRequestDocRef, (doc) => {
      if (doc.exists()) {
        const friendRequest = doc.data();
        setFriendshipStatus(friendRequest.status);
      }
    });
  }, [otherPersonId]);

  useEffect(() => {
    setButtonText(MAP_STATUS_TO_TEXT[friendshipStatus]);
  }, [friendshipStatus]);

  const findRefDoc = async () => {
    const possibleIds = [
      `${otherPersonId}_${currentUserId}`,
      `${currentUserId}_${otherPersonId}`,
    ];

    return Promise.all(
      possibleIds.map(async (id) => {
        const item = doc(database, "FriendRequests", id);
        if (!item) {
          return item;
        }
        const friendRequestDocSnap = await getDoc(item);
        return {
          docRef: item,
          exist: friendRequestDocSnap.exists(),
        };
      })
    ).then((results) => {
      return results.find((document) => document.exist) || results[0]
    });
  };

  const handleButtonClick = async () => {
    const result = await findRefDoc();
    const friendRequestDocRef = result?.docRef;

    if (friendshipStatus === STATUS.friends) {
      await deleteDoc(friendRequestDocRef);
      setFriendshipStatus(STATUS.strangers);
      setButtonText("Enviar solicitação de amizade");
      localStorage.setItem("buttonText", "Enviar solicitação de amizade");
      toast.success("Amizade desfeita com sucesso!", {
        position: "top-center",
      });
    } else if (friendshipStatus === STATUS.pendingRequest) {
      await deleteDoc(friendRequestDocRef);
      setFriendshipStatus(STATUS.strangers);
      setButtonText("Enviar solicitação de amizade");
      localStorage.setItem("buttonText", "Enviar solicitação de amizade");
      toast.success("Solicitação de amizade cancelada com sucesso!", {
        position: "top-center",
      });
    } else {
      const friendRequestDocSnap = await getDoc(friendRequestDocRef);

      debugger
      if (!friendRequestDocSnap.exists()) {
        await setDoc(friendRequestDocRef, {
          senderId: currentUserId,
          receiverId: otherPersonId,
          status: STATUS.pendingRequest,
        });
        setFriendshipStatus(STATUS.pendingRequest);
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
      <Topbar location="/userprofile/:otherPersonId" />
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
            {allowsFriendship && (
              <button
                onClick={handleButtonClick}
                className="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
              >
                {buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchedUserProfile;
