import React, { useState } from "react";
import ReactDOM from "react-dom";

const randomNumber = (maxNumber) => {
  return Math.floor(maxNumber * Math.random());
};

const App = ({ anecdotes }) => {
  const totalAnecdotes = anecdotes.length;

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(totalAnecdotes).fill(0)); //[1, 2, 6, 5, 3, 3]

  const clickHandle = () => {
    const number = randomNumber(totalAnecdotes);
    // console.log(number);
    setSelected(number);
  };
  const voteHandle = () => {
    const newPoints = [
      ...points.slice(0, selected),
      points[selected] + 1,
      ...points.slice(selected + 1),
    ];
    console.log("newPoint", newPoints);
    setPoints(newPoints);
  };
  const getAnecdoteWithMostVote = (anecdotes) => {
    //travel the array to find the biggest number
    const maxValue = Math.max(...points);
    //find the position of that number in the array
    const position = points.indexOf(maxValue);
    //return the correct anecdote
    return (
      <p>
        {anecdotes[position]} has {maxValue} votes
      </p>
    );
  };
  return (
    <div>
      <h1>Anecdotes</h1>
      <p>
        {anecdotes[selected]}
        <br />
        <span style={{ color: "red" }}>
          has {points[selected]} {points[selected] > 1 ? " votes" : " vote"}
        </span>
      </p>
      <button onClick={voteHandle}>Vote</button>
      <button onClick={clickHandle}>Next Anecdote</button>
      <br />
      <br />
      <h2>Anecdote with most votes</h2>
      {getAnecdoteWithMostVote(anecdotes)}
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById("root")
);
