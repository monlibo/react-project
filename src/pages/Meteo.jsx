import React, { useContext} from "react";
import MeteoFooter from "../components/MeteoFooter";
import MeteoHeader from "../components/MeteoHeader";
import { CityContext } from "../utils/context";
import "./../styles/pages/Meteo.css";
import Loader from "../utils/Atom";


const getWindDirection = (degre: number) => {
  if (degre >= 90 && degre <= 180) {
    return "NORD OUEST";
  }
  if (degre >= 180 && degre <= 260) {
    return "SUD OUEST";
  }
  if (degre >= 260 && degre <= 360) {
    return "SUD EST";
  }

  if (degre <= 90 && degre <= 180) {
    return "NORD EST";
  }
};


function Meteo() {
  const { city, updateCity, data, loading, error } = useContext(CityContext);
  
  const temp = data["main"];

  const getTime = (timestamp: number) => {
    var date = new Date(1000 * timestamp);
    var hour = date.getHours();
    var mins = date.getMinutes();
    return hour + ":" + mins;
  };

  const getActualDate = () => {
    var currentDate = new Date();
    var day = "";
    // Obtenir le jour en Français
    switch (currentDate.getDay()) {
      case 1:
        day = "Lundi";
        break;
      case 2:
        day = "Mardi";
        break;
      case 3:
        day = "Mercredi";
        break;
      case 4:
        day = "Jeudi";
        break;
      case 5:
        day = "Vendredi";
        break;
      case 6:
        day = "Samedi";
        break;
      case 7:
        day = "Dimanche";
        break;

      default:
        break;
    }

    return day + " " + currentDate.getHours() + ":" + currentDate.getMinutes();
  };

  //getActualDate();

  return !loading ? (
    !error ? (
      <div className="flex flex-col items-center  w-full h-full min-h-screen justify-center dark:bg-gray-700">
        <div className="page_wrapper">
          <MeteoHeader />
          <div className="location_wrapper">
            <span className="location">{city}</span>
            <span className="day_time">{getActualDate()}</span>
          </div>

          <div className="weather-time_image text-[220px] animate-pulse">
            {data["weather"][0].main ===
              ("Thunderstorms" ||
                "Thundershowers" ||
                "Storm" ||
                "Lightning" ||
                "Cloud-drizzle") && <i className="bi-cloud-lightning-rain"></i>}
            {data["weather"][0].main === "Hail" && (
              <i className="bi-cloud-hail"></i>
            )}
            {data["weather"][0].main === "Snow" && <i className="bi-cloud-snow"></i>}
            {data["weather"][0].main === "Clear" && <i className="bi-sun"></i>}
            {data["weather"][0].main === "Sleet" && (
              <i className="bi-cloud-sleet"></i>
            )}

            {data["weather"][0].main === "Showers" ||
              data["weather"][0].main === "Heavy Showers " ||
              (data["weather"][0].main === "Rainshower" && (
                <i className="bi-cloud-rain-heavy"></i>
              ))}
            {data["weather"][0].main === "Rain" && (
              <i className="bi-cloud-rain"></i>
            )}
            {data["weather"][0].main === "Dizzle" && (
              <i className="bi-cloud-drizzle"></i>
            )}
            {data["weather"][0].main === "Fog" && (
              <i className="bi-cloud-fog2"></i>
            )}
            {data["weather"][0].main === "Clouds" && (
              <i className="bi-clouds"></i>
            )}
            {data["weather"][0].main === "Haze" && (
              <i className="bi-cloud-haze2"></i>
            )}
          </div>

          <div className="degree-info_wrapper">
            <span className="degre">{data["main"] && data["main"].temp}°C</span>

            <span className="feel_time">
              {data["weather"] && data["weather"][0].description}
            </span>
          </div>

          <div className="separator1"></div>

          <div className="precision_wrapper">
            <div className="precision_item">
              <div className="precision_type_icon">
                <i className="bi-sunrise"></i>
              </div>
              <div className="precision_text ">
                <span className="precison_name">LEVEE</span>
                <span className="precison_value">
                  {getTime(data["sys"].sunrise)}
                </span>
              </div>
            </div>

            <div className="precision_item">
              <div className="precision_type_icon">
                <i className="bi-sunset"></i>
              </div>
              <div className="precision_text ">
                <span className="precison_name">COUCHEE</span>
                <span className="precison_value">
                  {getTime(data["sys"].sunset)}
                </span>
              </div>
            </div>

            <div className="precision_item">
              <div className="precision_type_icon">
                <i className="bi-compass"></i>
              </div>
              <div className="precision_text !border-none">
                <span className="precison_name">DIRECTION / VENT</span>
                <span className="precison_value">
                  {data["wind"] && getWindDirection(data["wind"].deg)}
                </span>
              </div>
            </div>

            <div className="precision_item">
              <div className="precision_type_icon">
                <i className="bi-wind"></i>
              </div>
              <div className="precision_text ">
                <span className="precison_name">VITESSE / VENT</span>
                <span className="precison_value">
                  {data["wind"] && data["wind"].speed}m/s
                </span>
              </div>
            </div>

            <div className="precision_item">
              <div className="precision_type_icon">
                <i className="bi-droplet"></i>
              </div>
              <div className="precision_text ">
                <span className="precison_name">HUMUDITE</span>
                <span className="precison_value">
                  {data["main"] && data["main"].humidity}%
                </span>
              </div>
            </div>

            <div className="precision_item">
              <div className="precision_type_icon">
                <i className="bi-eyeglasses"></i>
              </div>
              <div className="precision_text !border-none ">
                <span className="precison_name">VISIBILITE</span>
                <span className="precison_value">
                  {data["visibility"] && data.visibility / 1000}km
                </span>
              </div>
            </div>
          </div>
        </div>

        <MeteoFooter />
      </div>
    ) : (
      <div>Désolé, une erreur est survenue</div>
    )
  ) : (
    <Loader />
  );
}
export default Meteo;
