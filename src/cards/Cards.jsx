import React, { useEffect, useState } from "react";
import Topbar from "../bars/Topbar";
import { auth, database } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import PetsBarAndButton from "../bars/PetsBarAndButton";

const Cards = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      let docRef = doc(database, "RegularUsers", user.uid);
      let docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
      }
    });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Topbar location="/cards" />
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/4">
          <PetsBarAndButton />
        </div>
        <div className="w-full sm:w-3/4"></div>
      </div>
    </div>
  );
};

export default Cards;