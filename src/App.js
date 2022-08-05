//import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [firstOperand, setFirstOperand] = useState("");
  const [opd1Ready, setOpd1Ready] = useState(false);
  const [secondOperand, setSecondOperand] = useState("");
  const [opd2Ready, setOpd2Ready] = useState(false);
  const [operator, setOperator] = useState(null);
  const [operatorReady, setOperatorReady] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [screen, setScreen] = useState(0);
  const [tumbler, setTumbler] = useState(true);
  const [lastButton, setLastButton] = useState(null);
  const [gotAnswer, setGotAnswer] = useState(false);

  useEffect(() => {
    setScreen(firstOperand);
  }, [firstOperand]);

  useEffect(() => {
    setScreen(secondOperand);
  }, [secondOperand]);

  useEffect(() => {
    setScreen(operator);
  }, [operator]);

  useEffect(() => {
    setScreen(answer);
  }, [answer]);

  useEffect(() => {
    setScreen(0);
  }, []);

  useEffect(() => {
    setScreen(0);
  }, [tumbler]);

  function prepareToNextAction() {
    setFirstOperand("");
    setSecondOperand("");
    setOperator(null);
    setGotAnswer(true);
    setOpd1Ready(false);
    setOpd2Ready(false);
    setOperatorReady(false);
  }

  function handleNum(event) {
    const value = event.target.value;

    //if (!secondOperand && !operator) {
    if (!opd2Ready && !operatorReady) {
      setFirstOperand((prevFirstOperand) => prevFirstOperand + value); // 1 opd
      //setScreen(firstOperand);
      return;
    }

    //if (firstOperand && operator) {
    if (opd1Ready && operatorReady) {
      setSecondOperand((prevSecondOperand) => prevSecondOperand + value); // 2 opd
      //setScreen(secondOperand);
      return;
    }
  }

  function handleOp(event) {
    const value = event.target.value;

    setOpd1Ready(true);

    if (firstOperand && !secondOperand) {
      setOperator(value);
      //setScreen(operator);
    }

    setOperatorReady(true);
  }

  function processEqual() {
    setOpd2Ready(true);
    switch (operator) {
      case "+":
        setAnswer(+firstOperand + +secondOperand);
        prepareToNextAction();
        return;
      case "-":
        setAnswer(+firstOperand - +secondOperand);
        prepareToNextAction();
        return;
      case "*":
        setAnswer(+firstOperand * +secondOperand);
        prepareToNextAction();
        return;
      case "/":
        setAnswer(+firstOperand / +secondOperand);
        prepareToNextAction();
        return;
    }
  }

  function resetAll() {
    setFirstOperand("");
    setSecondOperand("");
    setAnswer(0);
    setOperator(null);
    setScreen(0);
    setTumbler((prevTumbler) => !prevTumbler);
  }

  return (
    <div className="App">
      <p>{screen}</p>

      <button onClick={handleNum} value={"7"}>
        7
      </button>
      <button onClick={handleNum} value={"8"}>
        8
      </button>
      <button onClick={handleNum} value={"9"}>
        9
      </button>
      <button onClick={handleOp} value={"/"}>
        /
      </button>
      <br />
      <button onClick={handleNum} value={"4"}>
        4
      </button>
      <button onClick={handleNum} value={"5"}>
        5
      </button>
      <button onClick={handleNum} value={"6"}>
        6
      </button>
      <button onClick={handleOp} value={"*"}>
        *
      </button>
      <br />
      <button onClick={handleNum} value={"1"}>
        1
      </button>
      <button onClick={handleNum} value={"2"}>
        2
      </button>
      <button onClick={handleNum} value={"3"}>
        3
      </button>
      <button onClick={handleOp} value={"-"}>
        -
      </button>
      <br />
      <button onClick={handleNum} value={"0"}>
        0
      </button>
      <button disabled={true} value={","}>
        ,
      </button>
      <button onClick={processEqual} value={"="}>
        =
      </button>
      <button onClick={handleOp} value={"+"}>
        +
      </button>
      <br />
      <button onClick={resetAll}>C</button>
    </div>
  );
}

export default App;
