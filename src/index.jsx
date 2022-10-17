import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/pages/index.css";
import "./assets/font-icon/bootstrap-icons.css";
import App from "./pages/App";
import Meteo from "./pages/Meteo";
import GlobalStyle from "./utils/style/GlobalStyle";
import { CityProvider, ThemeProvider } from "./utils/context";
import MemoryCard from "./pages/MemoryCard";
import DataTable from "./pages/DataTable";
import PasswordGenerator from "./pages/PasswordGenerator";
import TicTacToe from "./pages/TicTacToe";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CityProvider>
          <GlobalStyle />
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route exact path="/meteo" element={<Meteo />} />
            <Route exact path="/memory-card" element={<MemoryCard />} />
            <Route exact path="/data-table" element={<DataTable />} />
            <Route
              exact
              path="/password-generator"
              element={<PasswordGenerator />}
            />
            <Route exact path="/tictactoe" element={<TicTacToe />} />
          </Routes>
        </CityProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
