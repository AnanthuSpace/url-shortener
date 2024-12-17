import  { createContext } from "react";

interface GlobalContextType {
  email: string | null;
  setEmail: (email: string) => void;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

