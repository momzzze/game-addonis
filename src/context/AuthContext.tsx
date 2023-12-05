
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getAuth, User, onAuthStateChanged } from "firebase/auth";

interface AuthContextProps {
  children: ReactNode;
}

interface ContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const Context = createContext<ContextProps | undefined>(undefined);

export function AuthContext({ children }: AuthContextProps) {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe: (() => void) | undefined = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (currentUser) setUser(currentUser);
      else {
        setUser(null);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [auth]);

  const values: ContextProps = {
    user: user,
    setUser: setUser,
  };

  return (
    <Context.Provider value={values}>
      {!loading && children}
    </Context.Provider>
  );
}