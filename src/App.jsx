import { useState, useEffect } from "react";

export default function App() {
  const [value, setValue] = useState(1);
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");
  const [converted, setConverted] = useState(null);

  useEffect(() => {
    if (fromCur === toCur) {
      setConverted(value);
      return;
    }

    fetch(
      `https://api.frankfurter.app/latest?amount=${value}&from=${fromCur}&to=${toCur}`
    )
      .then((res) => res.json())
      .then((data) => setConverted(data.rates[toCur]));
  }, [value, fromCur, toCur]); // لازم كل ما أي واحدة منهم تتغير نعيد التحويل

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h2>🔁 Currency Converter</h2>

      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />

      <select value={fromCur} onChange={(e) => setFromCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      <select value={toCur} onChange={(e) => setToCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      <p>
        💰 {value} {fromCur} = {converted ?? "loading..."} {toCur}
      </p>
    </div>
  );
}
