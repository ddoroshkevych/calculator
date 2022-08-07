//import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [lastOperand, setLastOperand] = useState(0);
  const [current, setCurrent] = useState("0");
  const [operator, setOperator] = useState(null);
  const [log, setLog] = useState("");
  const [startNew, setStartNew] = useState(true);

  const handleNum = (value)=>{
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

  const handleOp = (value)=>{
    setLog(log + value);
    setLastOperand(Number.parseFloat(current));
    setStartNew(true);
    setOperator(value);
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

  const handleButton = (evt)=>{
    const val = evt.target.value;
    const code = val.charCodeAt(0);
    if(code>=48 && code <= 57){
      handleNum(val)
    }
    if(code === 46) handleDot();
    if(code === 61) processEqual();
    if("/+-*".indexOf(val) >= 0) handleOp(val);
  }

  console.log(current,lastOperand,operator);

  return (
    <div className="App">
      <p>{current}</p>
      {"789/456*123-0.=+".split("").map((ch,idx)=><><button key={idx} onClick={handleButton} value={ch}>{ch}</button>{(idx+1)%4 === 0 && <br/>}</>)}
      <button onClick={resetAll}>C</button>
      <p>{log}</p>
    </div>
  );
}

export default App;
