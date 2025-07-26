import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState(null);
  const [currencies, setCurrencies] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/currencies") // Change to Render URL later
      .then((res) => setCurrencies(res.data));
  }, []);

  const handleConvert = async () => {
    const res = await axios.get("http://localhost:8000/convert", {
      params: { from_currency: from, to_currency: to, amount },
    });
    setResult(res.data.rates[to]);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">💱 Currency Converter</h1>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input-field"
      />

      <div className="dropdown-container">
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="dropdown"
        >
          {Object.entries(currencies).map(([code, name]) => (
            <option key={code} value={code}>
              {code} - {name}
            </option>
          ))}
        </select>

        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="dropdown"
        >
          {Object.entries(currencies).map(([code, name]) => (
            <option key={code} value={code}>
              {code} - {name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleConvert} className="convert-button">
        Convert
      </button>

      {result && (
        <h2 className="result">
          {amount} {from} = {result} {to}
        </h2>
      )}
    </div>
  );
}

export default App;
