import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() =>
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? "dark"
      : "light"
  );

  const checkTheme = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      //setTheme("light");
    }
  };

  checkTheme();

  const toggleTheme = () => {
    // setTheme(theme === "light" ? "dark" : "light");
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      setTheme("light");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      setTheme("dark");
      localStorage.theme = "dark";
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [city, setCity] = useState("porto-novo");
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateCity = (value) => {
    setCity(value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const responseGeo = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=854b73e6835c94bd5f0845670ebaf9c3`
        );
        const latLong = await responseGeo.json();
        const latitude = latLong[0].lat;
        const longitude = latLong[0].lon;

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=fr&appid=854b73e6835c94bd5f0845670ebaf9c3&units=metric`
        );
        
        const datas = await response.json();
        setData(datas);       

      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    
    setLoading(true);
    fetchData();
  }, [city]);

  return (
    <CityContext.Provider value={{ city, updateCity, data, loading }}>
      {children}
    </CityContext.Provider>
  );
};
