import { useState, useEffect } from "react";

export default function PasswordGenerator() {
  const [code, setCode] = useState("");
  const [isCopyied, setIsCopyied] = useState(false);
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
    setIsCopyied(false);

    //console.log(Crypto.prototype.getRandomValues());
  };

  useEffect(() => {
    generate();
  }, []);

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopyied(true);
  };

  return (
    <div className="flex flex-col items-center w-full py-8 space-y-4">
      <div className="text-[20px]">Password generator</div>

      <div className=" flex items-end text-[100%]  md:text-[20px] h-[60px] font-semibold border px-4 py-2 !pt-[15px] rounded-lg relative overflow-hidden">
        {code}
        <button
          onClick={() => copy(code)}
          className="absolute  text-[14px] top-0 right-0"
        >
          {!isCopyied ? (
            <div className="text-gray-500 bg-gray-100 px-3 py-[2px]">
              <i className="bi-clipboard2"></i> Copy
            </div>
          ) : (
            <div className="px-3 py-[2px] text-green-600 bg-green-200">
              <i className="bi-clipboard2-check-fill"></i> Copyied
            </div>
          )}
        </button>
      </div>

      <button
        onClick={generate}
        className="bg-blue-500 text-[16px] text-gray-50 px-3 py-1 rounded-md w-fit"
      >
        Generate
      </button>
    </div>
  );
}
