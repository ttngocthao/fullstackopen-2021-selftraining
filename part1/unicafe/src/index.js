import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td> {value}</td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  const totalScore = good + bad + neutral;
  const averageScore = totalScore !== 0 ? (good - bad) / totalScore : 0;
  if (good === 0 && bad === 0 && neutral === 0) {
    return (
      <div>
        <h2>Statistic</h2>
        <h3>No feddback given</h3>
      </div>
    );
  }
  return (
    <div>
      <h2>Statistic</h2>
      <table>
        <thead>
          <tr>
            <td>Quanlity</td>
            <td>Quantity</td>
          </tr>
        </thead>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral}></Statistic>
          <Statistic text="Bad" value={bad} />
          <Statistic text="All" value={totalScore} />
          <Statistic text="Average" value={averageScore} />
          <Statistic text="Percentage" value={`${averageScore * 100}%`} />
        </tbody>
      </table>
    </div>
  );
};

const Button = ({ label, clickHandle }) => {
  return <button onClick={clickHandle}>{label}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const buttons = [
    { lable: "Good", handleFunc: () => setGood(good + 1) },
    { lable: "Neutral", handleFunc: () => setNeutral(neutral + 1) },
    { lable: "Bad", handleFunc: () => setBad(bad + 1) },
  ];

  return (
    <div>
      <h1>Give Feedback</h1>

      {buttons.map((button, index) => {
        return (
          <Button
            key={index}
            label={button.lable}
            clickHandle={button.handleFunc}
          />
        );
      })}
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
