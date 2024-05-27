import React, { useEffect, useState } from "react";
import { IoClose, IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import {
  collection,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { database, auth } from "../firebase";

const FriendshipRequestsModal = ({ onClose }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const q = query(
      collection(database, "FriendRequests"),
      where("receiverId", "==", auth.currentUser.uid),
      where("status", "==", "pending")
    );

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const requestsPromises = querySnapshot.docs.map(async (document) => {
        const senderId = document.data().senderId;
        const senderDocRef = doc(database, "RegularUsers", senderId);
        const senderDocSnap = await getDoc(senderDocRef);
        if (senderDocSnap.exists()) {
          return {
            id: document.id,
            sender: senderDocSnap.data(),
            ...document.data(),
          };
        } else {
          const senderDocRef = doc(database, "Veterinarians", senderId);
          const senderDocSnap = await getDoc(senderDocRef);
          if (senderDocSnap.exists()) {
            return {
              id: document.id,
              sender: senderDocSnap.data(),
              ...document.data(),
            };
          }
        }
      });
      const requests = await Promise.all(requestsPromises);
      setRequests(requests);
    });

    return () => unsubscribe();
  }, []);

  const handleAccept = async (requestId) => {
    await updateDoc(doc(database, "FriendRequests", requestId), {
      status: "accepted",
    });
    setRequests(requests.filter((request) => request.id !== requestId));
  };

  const handleReject = async (requestId) => {
    await updateDoc(doc(database, "FriendRequests", requestId), {
      status: "rejected",
    });
    setRequests(requests.filter((request) => request.id !== requestId));
  };

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
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3
                  className="text-lg leading-6 font-bold text-gray-900"
                  id="modal-title"
                >
                  Solicitações:
                </h3>
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-5 mb-2 border-b-2 border-gray-200"
                  >
                    <img
                      className="w-12 h-12 rounded-full"
                      src={request.sender.photoURL}
                      alt="User avatar"
                    />
                    <div className="flex-1">
                      <p className="text-black font-bold">
                        {request.sender.name}
                      </p>
                      <p className="text-gray-500 font-medium">
                        {request.sender.username}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAccept(request.id)}
                        className="text-green-500 text-4xl"
                      >
                        <IoCheckmarkCircle />
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="text-red-500 text-4xl"
                      >
                        <IoCloseCircle />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={onClose}
                className="absolute top-0 right-0 m-2 bg-red-500 hover:bg-red-600 text-white rounded w-8 h-8 flex items-center justify-center"
              >
                <IoClose size={24} />
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendshipRequestsModal;