import React, { useContext, useEffect } from "react";
import { Avatar, Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { userContext } from "../Utils/Context/user.context";
import richiesta from "../Utils/Functions/richiesta";

const Profile = () => {
  const { logout: _logout, isAuthenticated, isLoading } = useAuth0();
  const user = useContext(userContext);

  const logout = () => {
    _logout({ returnTo: window.location.origin });
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    richiesta(`/login/utente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: user.family_name + " " + user.given_name,
        email: user.email,
      }),
    });
  }, [isAuthenticated, user.family_name, user.email, user.given_name]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Avatar src={user.picture} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <h2>{user.name}</h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <p>{user.email}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Button variant="contained" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
