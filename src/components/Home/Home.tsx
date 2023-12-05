import { useEffect, useState } from "react";
import { getAuth, User } from "firebase/auth";

function Home() {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const [user, setUser] = useState<User | null>(null);

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
