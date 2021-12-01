import React, { useState, createContext, useEffect, useCallback } from "react";
import richiesta from "../Functions/richiesta";
import { useAuth0 } from "@auth0/auth0-react";
import LinearProgress from "@mui/material/LinearProgress";

import LoginButton from "../../Components/LoginButtton";

export const userContext = createContext();

export const UserProvider = (props) => {
  const [utente, setUtente] = useState(null);

  const { user, isLoading, error } = useAuth0();

  const getAdditionalUserInfo = useCallback(async () => {
    const email = encodeURIComponent(user.email);
    const ris = await richiesta("/login/utente/" + email);
    const json = await ris.json();

    const newUtente = { ...user };

    const otherInfo = json;

    setUtente({ ...newUtente, ...otherInfo });
  }, [user]);

  useEffect(() => {
    if (!user) return setUtente(null);

    getAdditionalUserInfo();
  }, [user, getAdditionalUserInfo]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  if (!utente) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "25px",
        }}
      >
        {isLoading && <LinearProgress />}
        <LoginButton />
      </div>
    );
  }
  return (
    <userContext.Provider value={utente}>{props.children}</userContext.Provider>
  );
};
