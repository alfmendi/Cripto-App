import { useState, createContext, useContext } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [divisa, setDivisa] = useState("eur");

  return (
    <Crypto.Provider value={{ divisa, setDivisa }}>{children}</Crypto.Provider>
  );
};

export const CryptoState = () => {
  return useContext(Crypto);
};

export default CryptoContext;
