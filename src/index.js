import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Vibro from "./Vibro";

// override global mui font theme to use roboto
// https://material-ui.com/customization/default-theme/
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Cambria",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  palette: {
    text: {
      primary: "#e57575",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div
    style={{
      backgroundColor: "#000000",
      height: "100vh",
      width: "100vw",
      backgroundImage: `linear-gradient(45deg, #d5f6eb 0%, #d5ddf6 100%)`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
    }}
  >
    <React.StrictMode>
      {" "}
      <ThemeProvider theme={theme}>
        <Vibro />
      </ThemeProvider>
    </React.StrictMode>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
