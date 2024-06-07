import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { database } from "../firebase";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Topbar from "../bars/Topbar";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchUsers = () => {
  const queryParam = useQuery();
  const [users, setUsers] = useState([]);
  const searchTerm = queryParam.get("query");

  const fetchUsers = useCallback(async () => {
    const regularUsersRef = collection(database, "RegularUsers");
    const veterinariansRef = collection(database, "Veterinarians");

    const fetchUsersFromCollection = async (collectionRef) => {
      const usersQueryByUsername = query(
        collectionRef,
        where("username", "==", searchTerm)
      );
      const usersQuerySnapshotByUsername = await getDocs(usersQueryByUsername);
      const usersByUsername = usersQuerySnapshotByUsername.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return [...usersByUsername];
    };

    const regularUsers = await fetchUsersFromCollection(regularUsersRef);
    const veterinarianUsers = await fetchUsersFromCollection(veterinariansRef);

    setUsers([...regularUsers, ...veterinarianUsers]);
  }, [searchTerm]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Topbar location="/search" />
        {users.map((user) => (
          <Link to={`/userprofile/${user.id}`} key={user.id}>
            <div className="flex items-center space-x-4 p-2 mb-2 border-b-2 border-gray-200 hover:bg-orange-300">
              {user.photoURL ? (
                <img
                  className="w-12 h-12 rounded-full"
                  src={user.photoURL}
                  alt="User avatar"
                />
              ) : (
                <div className="flex items-center justify-center w-12 h-12">
                  <FaUserCircle className="text-gray-400 w-12 h-12" />
                </div>
              )}
              <div>
                <p className="text-black font-bold">{user.name}</p>
                <p className="text-gray-500 font-medium">{user.username}</p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default SearchUsers;
