import { useContext, useState } from "react";
import { prodottiContext } from "../../Utils/Context/prodotti.context";
import { Button, Grid, Typography, Snackbar, IconButton } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { Close } from "@mui/icons-material";
import richiesta from "../../Utils/Functions/richiesta";
import Prodotto from "./Prodotto";
import { OrdiniContext } from "../../Utils/Context/ordini.context";

const priceFormatter = new Intl.NumberFormat(navigator.language, {
  style: "currency",
  currency: "EUR",
});

const Prodotti = () => {
  const getOrdini = useContext(OrdiniContext)[1];

  const prodotti = useContext(prodottiContext);
  const { user } = useAuth0();
  const [timeOut, impostaTimeout] = useState(null);

  const [prodottiSelezionati, setProdottiSelezionati] = useState([]);

  const aggiungiProdotto = (prodotto) => {
    setProdottiSelezionati([...prodottiSelezionati, prodotto]);
  };
  const rimuoviProdotto = (prodotto) => {
    const index = prodottiSelezionati.includes(prodotto);

    prodottiSelezionati.splice(index, 1);
    const narr = [...prodottiSelezionati];

    setProdottiSelezionati(narr);
  };

  const addOrdine = async () => {
    const data = {
      email: user.email,
      prodotti: prodottiSelezionati,
    };

    const headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const to = setTimeout(() => {
      richiesta("/ordini", headers).then(getOrdini);

      closeNotification();
    }, 3000);

    impostaTimeout(to);
  };

  const closeNotification = () => {
    clearTimeout(timeOut);
    impostaTimeout(null);
  };

  const closeAction = (
    <>
      <Button color="secondary" size="small" onClick={closeNotification}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeNotification}
      >
        <Close fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <Snackbar
        open={timeOut != null}
        autoHideDuration={3000}
        onClose={impostaTimeout}
        message="L'ordine verrà caricato tra 3 secondi"
        action={closeAction}
      />

      <Grid container spacing={2}>
        {prodotti.map((prodotto) => {
          return (
            <Grid item lg={4}>
              <Prodotto
                prodotto={prodotto}
                add={true}
                aggiungiProdotto={aggiungiProdotto}
                rimuoviProdotto={rimuoviProdotto}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid
        style={{ marginTop: ".1rem" }}
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          sm={12}
          style={{ verticalAlign: "middle" }}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Typography>
            Totale:{" "}
            {priceFormatter.format(
              prodottiSelezionati.reduce((acc, curr) => {
                return acc + curr.prezzoUnitario;
              }, 0)
            )}
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Button variant="contained" onClick={addOrdine}>
            Aggiungi ordine
          </Button>
        </Grid>
      </Grid>

      {/*<div>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          {prodotti.map((prodotto) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  justifyContent: "center",
                }}
              >
                <Prodotto
                  prodotto={prodotto}
                  add={true}
                  aggiungiProdotto={aggiungiProdotto}
                  rimuoviProdotto={rimuoviProdotto}
                />
              </div>
            );
          })}
        </List>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              Totale:{" "}
              {prodottiSelezionati.reduce((acc, curr) => {
                return acc + curr.prezzoUnitario;
              }, 0)}
              €
            </div>
            <Button variant="contained"  onClick={addOrdine}>Aggiungi ordine</Button>
          </div>
        </div>
      </div>*/}
    </>
  );
};

export default Prodotti;
