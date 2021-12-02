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

import { OrdiniProvider } from "./Utils/Context/ordini.context";

const lightTheme = createTheme({
  palette: {
    type: "light",
    mode: "light",
    primary: {
      main: "#640ff7",
    },
    background: {
      default: "#004ecc",
      paper: "#73a9ff",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    type: "dark",
    mode: "dark",
    primary: {
      main: "#29ffff",
    },
    background: {
      default: "#1c273a",
      paper: "#273652",
    },
    secondary: {
      main: "#f44336",
    },
    text: {
      main: "#000",
    },
  },
});

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(() => {
    const tema = prefersDarkMode ? darkTheme : lightTheme;

    return tema;
  }, [prefersDarkMode]);

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
