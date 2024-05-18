import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { database } from "../firebase";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Topbar from "../bars/Topbar";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Search = () => {
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
      <InfiniteScroll
        dataLength={users.length}
        next={fetchUsers}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {users.map((user) => (
          <Link to={`/userprofile/${user.id}`} key={user.id}>
            <div className="flex items-center space-x-4 p-2 mb-2 border-b-2 border-gray-200">
              <img
                className="w-12 h-12 rounded-full"
                src={user.photoURL}
                alt="User avatar"
              />
              <div>
                <p className="text-black">{user.name}</p>
                <p className="text-gray-500">{user.username}</p>
              </div>
            </div>
          </Link>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Search;