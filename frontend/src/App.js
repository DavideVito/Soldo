import "./App.css";
import { useMemo } from "react";
import {
  useMediaQuery,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Profile from "./Components/Profile";

import { ProdottiProvider } from "./Utils/Context/prodotti.context";
import Ordini from "./Components/Ordini";
import { UserProvider } from "./Utils/Context/user.context";
import { green as color } from "@mui/material/colors";
import { OrdiniProvider } from "./Utils/Context/ordini.context";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          mode: prefersDarkMode ? "dark" : "light",
          primary: {
            main: color[500],
          },
          secondary: {
            main: "#f44336",
          },
          backgroundColor: "#20252c",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <ProdottiProvider>
            <Profile />
            <OrdiniProvider>
              <Ordini />
            </OrdiniProvider>
          </ProdottiProvider>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
