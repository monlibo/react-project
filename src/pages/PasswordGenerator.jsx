import { useState } from "react";

export default function PasswordGenerator() {
  const [code, setCode] = useState("");
  const generate = () => {
    const lowerCase = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "@",
      "-",
      "_",
    ];

    const upperCase = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "/",
      "-",
      "@",
      "ç",
      "&",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];

    const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    let newArray = [
      ...number,
      ...lowerCase,
      ...upperCase,
      ...number,
      ...lowerCase,
      ...upperCase,
      ...number,
      ...upperCase,
      ...upperCase,
      ...number,
    ];

    newArray = newArray.sort(() => 0.5 - Math.random());

    let newCode = newArray.slice(0, 20).join("");

    while (!/[a-zA-Z0-9!-_@]+/.test(newCode)) {
      newArray = newArray.sort(() => 0.5 - Math.random());
      newCode = newArray.slice(0, 20).join("");
    }

    setCode(newCode);

    //console.log(Crypto.prototype.getRandomValues());
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4 py-8">
      <div className="text-[20px]">Password generator</div>
      <button
        onClick={generate}
        className="bg-blue-500 text-[25px] text-gray-50 px-3 py-1 rounded-md w-fit"
      >
        Generate
      </button>
      <div className="text-[30px] font-semibold border px-4 py-2 rounded-lg">
        {code}
      </div>
    </div>
  );
}
