import React, { useContext } from "react";
import { CityContext, ThemeContext } from "../utils/context";
import "./../assets/font-icon/bootstrap-icons.css";
import "./../styles/components/meteo_header.css";


function MeteoHeader() {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const { city, updateCity, data, loading } = useContext(CityContext);

  return (
    <header className="header">
      <form
        action=""
        id="search_form"
        onSubmit={(e) => {
          e.preventDefault();
          updateCity(e.target[0].value);
        }}
      >
        <input
          type="search"
          name=""
          id=""
          placeholder="Entrez une ville"
          className="search_input"
          defaultValue={city}
        />
      </form>
      <div className="theme_toggler_container">
        <button
          onClick={() => toggleTheme()}
          className={
            theme == "dark"
              ? "w-[45px] h-[20px] bg-gray-600 relative rounded-full"
              : "w-[45px] h-[20px] bg-gray-300 relative rounded-full"
          }
        >
          <div
            className={
              theme == "dark"
                ? "w-[25px] h-[25px]  bg-pink-600 text-white rounded-full absolute  right-0 -top-[3px] flex justify-center items-center text-[12px] "
                : "w-[25px] h-[25px] bg-blue-600 text-white rounded-full absolute  left-0 -top-[3px] flex justify-center items-center text-[12px] "
            }
          >
            {theme == "dark" ? (
              <i className="bi-moon-stars-fill"></i>
            ) : (
              <i className="bi-brightness-low-fill"></i>
            )}
          </div>
        </button>
      </div>
    </header>
  );
}

export default MeteoHeader;
