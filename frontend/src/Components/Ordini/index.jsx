import {
  IconButton,
  Grid,
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CardActions,
  Tooltip,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Modal from "../Modal";

import { green } from "@mui/material/colors";
import { useContext } from "react";

import richiesta from "../../Utils/Functions/richiesta";
import FormOrdini from "./Form";
import { userContext } from "../../Utils/Context/user.context";
import { OrdiniContext } from "../../Utils/Context/ordini.context";
import UploadComponent from "../UploadComponent";

const Ordini = () => {
  const [ordini, getOrdini] = useContext(OrdiniContext);

  const user = useContext(userContext);

  const marcaOrdineCompletato = async (idOrdine) => {
    const ris = await richiesta("/ordini/completato", {
      body: JSON.stringify({ idOrdine }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    if (!ris.ok) {
      alert("Error");
    }

    getOrdini();
  };

  return (
    <div
      style={{
        margin: "0px .5rem",
        marginBottom: "100px",
      }}
    >
      <Modal
        bottone={{
          text: "Crea nuovo ordine",
          style: { display: "flex", justifyContent: "center" },
        }}
      >
        <FormOrdini />
      </Modal>

      {/*
      {false && user.admin ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <UploadComponent />
        </div>
      ) : (
        <></>
      )}
      
      
      */}
      <div style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
        <Typography textAlign="center" variant="h4">
          Ordini
        </Typography>
      </div>

      {ordini.length ? (
        <OrdiniContainer
          ordini={ordini}
          user={user}
          marcaOrdineCompletato={marcaOrdineCompletato}
        />
      ) : (
        <Typography textAlign="center">
          Nessun ordine caricato, clicca su
          <pre style={{ display: "inline", margin: "0px 5px" }}>
            {" "}
            Crea nuovo ordine
          </pre>{" "}
          per crearne uno
        </Typography>
      )}
    </div>
  );
};

const OrdiniContainer = ({ ordini, user, marcaOrdineCompletato }) => {
  return (
    <Grid container spacing={{ xs: 1, md: 3 }}>
      {ordini.map((ordine) => {
        return (
          <Grid item xs={12} sm={6} md={3} key={ordine.idOrdine}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                    {ordine.idOrdine}
                  </Avatar>
                }
                title={ordine.nome}
                subheader={
                  "Data: " +
                  new Date(ordine.data).toLocaleString(navigator.language)
                }
              />

              <CardContent>
                <Grid
                  container
                  spacing={{ xs: 3, md: 3 }}
                  style={{ margin: "1px" }}
                >
                  {ordine.dettagli.map((dett) => {
                    return (
                      <Grid item key={dett.nomeProdotto}>
                        <Typography variant="body1">
                          • {dett.nomeProdotto}
                        </Typography>
                        <Typography variant="body2">
                          {dett.tipoProdotto} {dett.QTA}
                        </Typography>
                      </Grid>
                    );
                  })}
                </Grid>
              </CardContent>

              {user.admin ? (
                <CardActions disableSpacing>
                  <Tooltip title="Marca come completato">
                    <IconButton
                      aria-label="Marca come completato"
                      onClick={() => {
                        marcaOrdineCompletato(ordine.idOrdine);
                      }}
                    >
                      <CheckIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              ) : (
                ""
              )}
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Ordini;
