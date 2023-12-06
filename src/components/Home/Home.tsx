import { useEffect, useState,useContext } from "react";
import { getAuth, User } from "firebase/auth";
import { Context } from "@/context/AuthContext";

function Home() {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const [user, setUser] = useState<User | null>(null);
  const {currentUserInfo,isAdmin}=useContext(Context)||{};
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setCurrentUser(userAuth);
        setUser(userAuth);
      } else {
        setCurrentUser(null);
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);
  useEffect(() => {
    if (currentUserInfo && !isAdmin) {
      // Do something with currentUserInfo and isAdmin
      console.log(currentUserInfo);
      console.log(isAdmin);
    }
  }, [currentUserInfo, isAdmin]);
  return (
    <div>
      <h1 className="text-bold text-3xl">Home</h1>
      {currentUser ? (
        <h2 className="text-bold text-2xl">Welcome {currentUser?.email}</h2>
      ) : (
        <h2 className="text-bold text-2xl">Welcome Guest</h2>
      )}
    </div>
  );
}

export default Home;
