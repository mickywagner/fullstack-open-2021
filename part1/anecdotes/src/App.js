import React, { useState } from "react";
import Anecdote from "./Anecdote";
import Button from "./Button";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(7).fill(0));
  const [mostVotesIndex, setMostVotes] = useState(0);

  const total = points.reduce((a, b) => a + b);

  const getNextAnecdote = () => {
    const getRandomNumber = () => Math.floor(Math.random() * anecdotes.length);

    while (true) {
      const index = getRandomNumber();

      if (index !== selected) {
        setSelected(index);
        break;
      }
    }
    checkVotes(points);
  };

  const addVote = () => {
    let copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
    checkVotes(copy);
  };

  const checkVotes = (array) => {
    const newHighestPoints = array.find((p) => p > points[mostVotesIndex]);

    if (newHighestPoints > -1) {
      const newIndex = array.indexOf(newHighestPoints);
      setMostVotes(newIndex);
    }
  };

  return (
    <div className="container">
      <Anecdote
        title="Anecodote of the Day"
        text={anecdotes[selected]}
        votes={points[selected]}
      />
      <div className="buttons">
        <Button onClick={addVote} text="Vote" />
        <Button onClick={getNextAnecdote} text="Next Anecdote" />
      </div>
      {total < 1 ? (
        <p>No votes have been cast</p>
      ) : (
        <Anecdote
          title="Anecdote with the Most Votes"
          text={anecdotes[mostVotesIndex]}
          votes={points[mostVotesIndex]}
        />
      )}
    </div>
  );
};
export default App;
