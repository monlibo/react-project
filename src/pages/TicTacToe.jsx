import React from "react";
import { useState } from "react";
import "../styles/pages/TicTacToe.css";

const TicTacToe = () => {
  const [fields, setFields] = useState([]);
  const combinaisons = [
    123, 312, 231, 132, 213, 321, 258, 285, 582, 528, 852, 825, 147, 174, 471,
    417, 714, 741, 456, 465, 564, 546, 654, 645, 369, 396, 693, 639, 963, 936,
    789, 798, 897, 879, 987, 978, 159, 195, 591, 519, 951, 915, 357, 375, 573,
    753, 735,
  ];
  //const [playerField, setPlayerField] = useState([]);

  const add = (field) => {
    if (fields.findIndex((element) => element.field === field) === -1) {
      fields.push({ player: "o", field: field });
      setFields([...fields]);

      let playerFields = fields.map((element) => {
        if (element.player === "o") {
          return element.field;
        }
      });
      //console.log(playerFields.join(""));

      let newCombinaison = combinaisons.filter((element) =>
        element.toString().includes(playerFields.join(""))
      );

      console.log(newCombinaison);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center pt-6">
      <div className="w-[450px] h-fit  border grid grid-cols-3 grid-rows-3 gap-1 rounded-lg overflow-hidden text-white [&>*]:bg-gray-700 [&>*]:h-[150px] [&>*]:flex [&>*]:items-center [&>*]:justify-center [&>*]:text-[60px]">
        {new Array(9).fill(1).map(({}, index) => {
          return (
            <div key={index} onClick={() => add(index + 1)} className="">
              <span>{index + 1}</span>
              {fields.findIndex((element) => element.field === index + 1) !==
              -1 ? (
                fields[
                  fields.findIndex((element) => element.field === index + 1)
                ].player === "o" ? (
                  <span>
                    <i className="bi bi-circle"></i>
                  </span>
                ) : (
                  <span>
                    <i className="bi bi-x"></i>
                  </span>
                )
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TicTacToe;
