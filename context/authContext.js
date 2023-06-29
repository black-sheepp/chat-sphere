import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
     const [currentUser, setCurrentUser] = useState(null);
     const [isLoading, setIsLoading] = useState(true);

     const clear = () => {
          setCurrentUser(null);
          setIsLoading(false);
     }

     const authStateChanged = (user) => {
          setIsLoading(true);
          if(!user){
               clear();
               return;
          }
          setCurrentUser(user);
          setIsLoading(false);
     }

     useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, authStateChanged);
          return () => unsubscribe();
     },[])

     const signOut = () => {
          authSignOut(auth).then(()=>clear())
     }

     return (
          <UserContext.Provider
               value={{
                    currentUser,
                    setCurrentUser,
                    isLoading,
                    setIsLoading,
                    signOut,
               }}
          >
               {children}
          </UserContext.Provider>
     );
};

export const useAuth = () => useContext(UserContext);
