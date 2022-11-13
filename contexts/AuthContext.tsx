import { useRouter } from 'next/router';
import { ReactNode, createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';

const AuthContext = createContext<{
  loggedIn: boolean;
  setLoggedIn?: Dispatch<SetStateAction<boolean>>,
}>({ loggedIn: false });

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(false);

  return (
    <AuthContext.Provider value={{ loggedIn: user, setLoggedIn: setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
