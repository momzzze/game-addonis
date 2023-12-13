
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getAuth, User, onAuthStateChanged } from "firebase/auth";
import { UserData } from "@/components/Auth/SignUp/SignUp";
import { getUserById } from "@/services/user.service";

interface AuthContextProps {
  children: ReactNode;
}

interface ContextProps {
  user: User | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuth: boolean;
  currentUserInfo:UserData|null;  
  isAdmin:boolean;
}

export const Context = createContext<ContextProps | undefined | null>(undefined);

export function AuthContext({ children }: AuthContextProps) {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>();
  const [currentUserInfo, setCurrentUserInfo] = useState<UserData | null>(null); // [1
  const [loading, setLoading] = useState(true);
  const isAuth= user !== null && user !== undefined;
  const [isAdmin, setIsAdmin] = useState(false);

  const getCurrentUserInfo=async(id:string)=>{    
   try {
    const data=await getUserById(id);
   if(data){
      setCurrentUserInfo(data);
      if(data?.role==='admin'){
        setIsAdmin(true);      
      }else{
        setIsAdmin(false);
      }
   } 
   } catch (error) {
      console.log(`Error getting user info: ${error}`);      
   }
  }


  useEffect(() => {
    const unsubscribe: (() => void) | undefined = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (currentUser) {        
        setUser(currentUser);
        getCurrentUserInfo(currentUser.uid);
      }
      else {
        setUser(null);
        setCurrentUserInfo(null);
        setIsAdmin(false);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [auth]);

  const values: ContextProps = {
    user: user,
    setUser: setUser,
    isAuth: isAuth,
    currentUserInfo:currentUserInfo,
    isAdmin:isAdmin,
  };

  return (
    <Context.Provider value={values}>
      {!loading && children}
    </Context.Provider>
  );
}