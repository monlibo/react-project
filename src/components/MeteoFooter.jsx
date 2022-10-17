import React from "react";
import "../styles/components/meteo_footer.css";

function MeteoFooter() {
  return (
    <footer className="w-full p-4  dark:bg-gray-700">
      <p className="text-center dark:text-gray-100">
        Made in 2022 by Libert Assogba. Twitter{" "}
        <a href="http://twitter.com/libertassogba" className="text-blue-500">@libertassogba</a> | Github{" "}
        <a href="http://github.com/monlibo" className="text-blue-500">@monlibo</a>{" "}
      </p>
    </footer>
  );
}

export default MeteoFooter;
