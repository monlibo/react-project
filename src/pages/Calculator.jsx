import React from 'react'
import { useState} from 'react';

function Calculator() {
    const [state, setState] = useState("off");
    const [result, setResult] = useState("");
    const [calc, setCalc] = useState("");
    const ops = ["+", "-", "/", "*", "."];
  
    const toggleState = () => {
      if (state === "off") {
        setState("on");
      } else {
        clear();
        setState("off");
      }
    };
  
    const updateCalc = (value) => {
      if (state === "on") {
        if (
          (ops.includes(value) && calc === "") ||
          (ops.includes(value) && ops.includes(calc.slice(-1)))
        ) {
          return;
        }
        setCalc(calc + value);
  
        if (!ops.includes(value)) {
          setResult(eval(calc + value));
        }
      }
    };
  
    const calculate = () => {
      if (state === "on") {
        if (ops.includes(calc.slice(-1))) {
          setResult("Syntax error");
        } else {
          setResult(eval(calc).toString());
        }
      }
    };
  
    const deleteLast = () => {
      if (state === "on") {
        if (calc === "") {
          return;
        }
  
        const value = calc.slice(0, -1);
        setCalc(value);
        setResult(eval(value).toString());
      }
    };
  
    const clear = () => {
      if (state === "on") {
        setCalc("");
        setResult("");
      }
    };
  
    return (
      <div className="px-4">
        <div className="bg-gray-700 w-full md:w-[320px] mx-auto  flex flex-col my-[25px] overflow-hidden rounded-2xl text-white">
          {/* L'entête de la calculatrice */}
          <div className="w-full flex flex-col space-y-3 h-[90px] p-4">
            <div className="flex justify-between w-full">
              <span className="font-extrabold">CASIO</span>
              <span className="italic">fx-82MS</span>
            </div>
            <div className="flex justify-center w-full">
              <span className="font-bold text-red-500">S-V.P.A.M</span>
            </div>
          </div>
  
          {/* L'écran de la calculatrice */}
          <div className="flex px-6 w-full h-[90px]">
            <div className="flex flex-col justify-between w-full h-full px-4 py-2 text-black bg-gray-400 rounded-md">
              {state === "on" ? (
                <>
                  <div className="w-full h-[40px] flex items-center justify-start">
                    {calc}
                  </div>
                  <div className="w-full h-[50px] flex items-center justify-end text-[20px] ">
                    {result}
                  </div>
                </>
              ) : (<div className="w-full h-full flex items-center justify-center text-[30px] font-bold text-gray-600">
                  CASIO
              </div>)}
            </div>
          </div>
  
          {/* Le conteneur des touches */}
          <div className="h-full w-full !mt-6 flex flex-col justify-end p-4 pb-8">
            <div className="grid w-full grid-flow-row grid-cols-5 gap-4 mb-4 h-fit">
              <button
                onClick={() => updateCalc("(")}
                className="calculator-bottom-button "
              >
                (
              </button>
              <button
                onClick={() => updateCalc(")")}
                className="calculator-bottom-button "
              >
                )
              </button>
              <button
                onClick={toggleState}
                className="w-full bg-red-500 uppercase h-[35px] flex justify-center items-center rounded-lg col-span-3"
              >
                {state === "on" ? "off" : "on"}
              </button>
            </div>
            {/* Les touches basiques */}
            <div className="grid w-full grid-flow-row grid-cols-5 gap-4 h-fit">
              <button
                onClick={() => updateCalc(7)}
                className="calculator-bottom-button "
              >
                7
              </button>
              <button
                onClick={() => updateCalc(8)}
                className="calculator-bottom-button "
              >
                8
              </button>
              <button
                onClick={() => updateCalc(9)}
                className="calculator-bottom-button "
              >
                9
              </button>
              <button
                onClick={deleteLast}
                className="w-full bg-red-500 uppercase h-[35px] flex justify-center items-center rounded-lg"
              >
                del
              </button>
              <button
                onClick={clear}
                className="w-full bg-red-500 uppercase h-[35px] flex justify-center items-center rounded-lg"
              >
                ac
              </button>
              <button
                onClick={() => updateCalc(4)}
                className="calculator-bottom-button "
              >
                4
              </button>
              <button
                onClick={() => updateCalc(5)}
                className="calculator-bottom-button "
              >
                5
              </button>
              <button
                onClick={() => updateCalc(6)}
                className="calculator-bottom-button "
              >
                6
              </button>
              <button
                onClick={() => updateCalc("*")}
                className="calculator-bottom-button "
              >
                x
              </button>
              <button
                onClick={() => updateCalc("/")}
                className="calculator-bottom-button "
              >
                /
              </button>
              <button
                onClick={() => updateCalc(1)}
                className="calculator-bottom-button "
              >
                1
              </button>
              <button
                onClick={() => updateCalc(2)}
                className="calculator-bottom-button "
              >
                2
              </button>
              <button
                onClick={() => updateCalc(3)}
                className="calculator-bottom-button "
              >
                3
              </button>
              <button
                onClick={() => updateCalc("+")}
                className="calculator-bottom-button "
              >
                +
              </button>
              <button
                onClick={() => updateCalc("-")}
                className="calculator-bottom-button "
              >
                -
              </button>
              <button
                onClick={() => updateCalc(0)}
                className="calculator-bottom-button "
              >
                0
              </button>
              <button
                onClick={() => updateCalc(".")}
                className="calculator-bottom-button "
              >
                .
              </button>
              <button className="calculator-bottom-button ">exp</button>
              <button className="calculator-bottom-button ">ans</button>
              <button onClick={calculate} className="calculator-bottom-button ">
                =
              </button>
            </div>
          </div>
        </div>
        <div className="w-full text-center">
          Made By <span className="text-red-500">Libert Assogba</span>
        </div>
      </div>
    );
}

export default Calculator