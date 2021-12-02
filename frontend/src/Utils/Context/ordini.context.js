import React, {
  useState,
  createContext,
  useEffect,
  useContext,
  useCallback,
} from "react";
import richiesta from "../Functions/richiesta";
import { userContext } from "./user.context";
import { Skeleton, Stack, Grid } from "@mui/material";

export const OrdiniContext = createContext();

const SkeletonCustomComponent = () => (
  <Stack spacing={1}>
    <Stack direction="row">
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="text" sx={{ marginLeft: "5px" }} width={100} />
    </Stack>
    <Skeleton variant="rectangular" width={210} height={118} />
  </Stack>
);

export const OrdiniProvider = ({ children }) => {
  const user = useContext(userContext);
  const [ordini, setOrdini] = useState(null);

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
      {ordini ? (
        children
      ) : (
        <>
          <Grid container spacing={{ xs: 1, md: 3 }}>
            {Array(10)
              .fill(0)
              .map((element, index) => {
                return (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <SkeletonCustomComponent />
                  </Grid>
                );
              })}
          </Grid>
        </>
      )}
    </OrdiniContext.Provider>
  );
};
