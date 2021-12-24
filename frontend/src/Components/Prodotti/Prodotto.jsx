import {
  ListItem,
  ListItemText,
  Button,
  Typography,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
const Prodotto = ({ prodotto, add, aggiungiProdotto, rimuoviProdotto }) => {
  const [qta, setQta] = useState(0);

  const increment = () => {
    if (qta >= 10) return;
    aggiungiProdotto(prodotto);
    setQta(qta + 1);
  };
  const decrement = () => {
    rimuoviProdotto(prodotto);
    if (qta <= 0) return;

    setQta(qta - 1);
  };

  return (
    <>
      <ListItem key={prodotto.id}>
        <Avatar
          src={
            "http://localhost:3001/" + prodotto.percorso ??
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
          }
        />
        <ListItemText
          primary={prodotto.nome}
          secondary={prodotto.prezzoUnitario}
        />
      </ListItem>

      {add && (
        <>
          <Button variant="contained" onClick={decrement}>
            <RemoveIcon />
          </Button>
          <Typography variant="body2" display="inline" margin="15px">
            {qta}
          </Typography>
          <Button variant="contained" onClick={increment}>
            <AddIcon />
          </Button>
        </>
      )}
    </>
  );
};

export default Prodotto;
