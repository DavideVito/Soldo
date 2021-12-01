import React, { useState, createContext, useEffect } from "react";
import richiesta from "../Functions/richiesta";

export const prodottiContext = createContext();

export const ProdottiProvider = (props) => {
  const [prodotti, setProdotti] = useState([]);

  const getProdotti = async () => {
    const ris = await richiesta("/prodotti/");
    const json = await ris.json();

    setProdotti(json);
  };

  useEffect(() => {
    getProdotti();
  }, []);

  return (
    <prodottiContext.Provider value={prodotti}>
      {props.children}
    </prodottiContext.Provider>
  );
};
