import React, {
  useState,
  createContext,
  useEffect,
  useContext,
  useCallback,
} from "react";
import richiesta from "../Functions/richiesta";
import { userContext } from "./user.context";

export const OrdiniContext = createContext();

export const OrdiniProvider = ({ children }) => {
  const user = useContext(userContext);
  const [ordini, setOrdini] = useState([]);

  const getOrdini = useCallback(async () => {
    const email = encodeURIComponent(user.email);

    const ris = await richiesta(`/ordini/${email}`);
    const json = await ris.json();
    setOrdini(json);
  }, [user.email]);

  useEffect(() => {
    getOrdini();
  }, [getOrdini]);

  return (
    <OrdiniContext.Provider value={[ordini, getOrdini]}>
      {children}
    </OrdiniContext.Provider>
  );
};
