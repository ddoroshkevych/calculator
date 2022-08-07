//import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [lastOperand, setLastOperand] = useState(0);
  const [current, setCurrent] = useState("0");
  const [operator, setOperator] = useState(null);
  const [log, setLog] = useState("");
  const [startNew, setStartNew] = useState(true);

  const handleNum = (evt)=>{
    const value = evt.target.value;
    setLog(log+value);
    setCurrent(startNew ? value : current + value );
    setStartNew(false);
  }

  const calc = ()=>{
    const res = eval( lastOperand.toString()  + operator + current);
    setLastOperand(Number.parseFloat(current));
    setCurrent(res.toString());
    setStartNew(true);
  }

  const handleOp = (evt)=>{
    setLog(log+evt.target.value);
    setLastOperand(Number.parseFloat(current));
    setStartNew(true);
    setOperator(evt.target.value);
  }
  const handleDot = ()=>{
    setLog(log+".");
    if(startNew){
      setCurrent("0.");
    }else{
      setCurrent(current+".");
    }
  }
  const processEqual = ()=>{calc();}
  const resetAll = ()=>{
    setCurrent("0");
    setLastOperand(0);
    setOperator(null);
    setStartNew(true);
  }

  console.log(current,lastOperand,operator);

  return (
    <div className="App">
      <p>{current}</p>
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
      <button onClick={handleDot} disabled={false} value={"."}>
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
      <p>{log}</p>
    </div>
  );
}

export default App;
