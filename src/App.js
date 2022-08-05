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
  // const [buffer, setBuffer] = useState(null);
  // const [gotAnswer, setGotAnswer] = useState(false);

  useEffect(() => {
    setScreen(firstOperand);
  }, [firstOperand]);

  useEffect(() => {
    setScreen(secondOperand);
  }, [secondOperand]);

  // useEffect(() => {
  //   setScreen(operator);
  // }, [operator]);

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
    //setGotAnswer(true);
    setOpd1Ready(false);
    setOpd2Ready(false);
    setOperatorReady(false);
  }

  function handleNum(event) {
    console.log(
      "Num  - opd1=",
      firstOperand,
      "sign=",
      operator,
      "opd2=",
      secondOperand
    );
    const value = event.target.value;

    //if (!secondOperand && !operator) {
    if (!opd2Ready && !operatorReady) {
      setFirstOperand((prevFirstOperand) => prevFirstOperand + value); // 1 opd
      setOpd1Ready(true);

      return;
    }

    //if (firstOperand && operator) {
    if (opd1Ready && operatorReady) {
      setSecondOperand((prevSecondOperand) => prevSecondOperand + value); // 2 opd
      setOpd2Ready(true);

      return;
    }
  }

  function processAnswer(a, b, op) {
    switch (op) {
      case "+":
        return +a + +b;
      case "-":
        return +a - +b;
      case "*":
        return +a * +b;
      case "/":
        return +a / +b;
    }
  }

  function handleOp(event) {
    console.log(
      "Oper  - opd1=",
      firstOperand,
      "sign=",
      operator,
      "opd2=",
      secondOperand
    );
    const value = event.target.value;

    if (firstOperand) {
      setOpd1Ready(true);
    } else return;

    if (opd1Ready && operatorReady && secondOperand) {
      setSecondOperand("");

      setAnswer(processAnswer(firstOperand, secondOperand, operator));

      setOperator(value);
      setFirstOperand(processAnswer(firstOperand, secondOperand, operator));

      setOpd1Ready(true);
      setOpd2Ready(false);
      setOperatorReady(true);

      return;
    }

    if (firstOperand && !secondOperand) {
      setOperator(value);
      setOperatorReady(true);
      //setScreen(operator);
      return;
    }
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
    setOpd1Ready(false);
    setOpd2Ready(false);
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
