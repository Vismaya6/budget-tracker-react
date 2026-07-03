import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Income");
  const [date, setDate] = useState("");

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {
    if (!title || !amount || !date) {
      alert("Please fill all fields!");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      title,
      amount: Number(amount),
      type,
      date,
    };

    setTransactions([...transactions, newTransaction]);

    setTitle("");
    setAmount("");
    setType("Income");
    setDate("");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((item) => item.id !== id));
  };

  const income = transactions
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = income - expense;

  return (
    <div className="container">
      <h1>💰 Budget Tracker</h1>

      <div className="summary">
        <div className="card balance">
          <h3>Balance</h3>
          <p>₹{balance}</p>
        </div>

        <div className="card income-card">
          <h3>Income</h3>
          <p>₹{income}</p>
        </div>

        <div className="card expense-card">
          <h3>Expenses</h3>
          <p>₹{expense}</p>
        </div>
      </div>

      <div className="form">
        <input
          type="text"
          placeholder="Transaction Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>Income</option>
          <option>Expense</option>
        </select>

        <button onClick={addTransaction}>Add Transaction</button>
      </div>

      <div className="transactions">
        <h2>Transactions</h2>

        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          transactions.map((item) => (
            <div
              key={item.id}
              className={`transaction ${
                item.type === "Income" ? "income" : "expense"
              }`}
            >
              <div>
                <strong>{item.title}</strong>
                <br />
                <small>{item.date}</small>
              </div>

              <div>
                {item.type === "Income" ? "+" : "-"}₹{item.amount}
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteTransaction(item.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;