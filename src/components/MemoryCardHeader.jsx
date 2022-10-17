import React, { useContext } from "react";
import { CityContext, ThemeContext } from "../utils/context";
import "./../assets/font-icon/bootstrap-icons.css";
import "./../styles/components/meteo_header.css";
import { se } from "seconds-converter";

function MeteoHeader() {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const { city, updateCity, data, loading } = useContext(CityContext);

  return (
    <header className="header">
      <div className="text-[20px] font-bold text-blue-600">
        MEMORY CARD GAME
      </div>
      <div>Tentatives : {chance}/15</div>
    </header>
  );
}

export default MeteoHeader;
