import { Grid } from "@mui/material";
import Prodotti from "../../Prodotti";

const FormOrdini = () => {
  return (
    <Grid container spacing={{ xs: 3, md: 3 }} style={{ margin: "1px" }}>
      <Prodotti />
    </Grid>
  );
};

export default FormOrdini;
