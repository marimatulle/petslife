import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { database, auth } from "../firebase";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const FriendsModal = ({ onClose }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
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

      const receivedFriendsPromises = receivedRequestsSnapshot.docs.map(
        async (docSnapshot) => {
          const senderId = docSnapshot.data().senderId;
          const senderDocRef = doc(database, "RegularUsers", senderId);
          const senderDocSnap = await getDoc(senderDocRef);
          if (senderDocSnap.exists()) {
            return {
              id: docSnapshot.id,
              friend: senderDocSnap.data(),
              senderId: senderId,
              ...docSnapshot.data(),
            };
          } else {
            const senderDocRef = doc(database, "Veterinarians", senderId);
            const senderDocSnap = await getDoc(senderDocRef);
            if (senderDocSnap.exists()) {
              return {
                id: docSnapshot.id,
                friend: senderDocSnap.data(),
                senderId: senderId,
                ...docSnapshot.data(),
              };
            }
          }
        }
      );

      const sentFriendsPromises = sentRequestsSnapshot.docs.map(
        async (docSnapshot) => {
          const receiverId = docSnapshot.data().receiverId;
          const receiverDocRef = doc(database, "RegularUsers", receiverId);
          const receiverDocSnap = await getDoc(receiverDocRef);
          if (receiverDocSnap.exists()) {
            return {
              id: docSnapshot.id,
              friend: receiverDocSnap.data(),
              receiverId: receiverId,
              ...docSnapshot.data(),
            };
          } else {
            const receiverDocRef = doc(database, "Veterinarians", receiverId);
            const receiverDocSnap = await getDoc(receiverDocRef);
            if (receiverDocSnap.exists()) {
              return {
                id: docSnapshot.id,
                friend: receiverDocSnap.data(),
                receiverId: receiverId,
                ...docSnapshot.data(),
              };
            }
          }
        }
      );

      const receivedFriends = await Promise.all(receivedFriendsPromises);
      const sentFriends = await Promise.all(sentFriendsPromises);

      setFriends([...receivedFriends, ...sentFriends]);
    };

    fetchFriends();
  }, []);

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ></span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-auto mx-auto sm:my-8 sm:align-middle w-full sm:max-w-lg">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3
                  className="text-lg leading-6 font-bold text-gray-900"
                  id="modal-title"
                >
                  Amigos:
                </h3>
                {friends.map((friend) => {
                  const profileId =
                    friend.senderId === auth.currentUser.uid
                      ? friend.receiverId
                      : friend.senderId;
                  return (
                    <Link to={`/userprofile/${profileId}`} key={friend.id}>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-5 mb-2 border-b-2 border-gray-200">
                        {friend.friend.photoURL ? (
                          <img
                            className="w-12 h-12 rounded-full"
                            src={friend.friend.photoURL}
                            alt="Friend avatar"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-12 h-12">
                            <FaUserCircle className="text-gray-400 w-12 h-12" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-black font-bold">
                            {friend.friend.name}
                          </p>
                          <p className="text-gray-500 font-medium">
                            {friend.friend.username}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <button
                onClick={onClose}
                className="absolute top-0 right-0 m-2 bg-red-500 hover:bg-red-600 text-white rounded w-8 h-8 flex items-center justify-center"
              >
                <IoClose size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsModal;