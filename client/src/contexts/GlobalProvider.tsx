import { ReactNode, useState } from "react";
import { GlobalContext } from "./GlobalContext";

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [email, setEmail] = useState<string | null>(null);

  return (
    <GlobalContext.Provider value={{ email, setEmail }}>
      {children}
    </GlobalContext.Provider>
  );
};
