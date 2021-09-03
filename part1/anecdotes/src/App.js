import React, { useEffect, useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(7).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const getRandomNumber = () => Math.floor(Math.random() * anecdotes.length)

  const getNextAnecdote = () => {
    while (true) {
      const index = getRandomNumber();

      if (index !== selected) {
        setSelected(index)
        return;
      }
    }
  }

  const addVote = () => {
    let copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    checkVotes(copy)
  }

  const checkVotes = (array) => {
    let highestPoints = mostVotes;
    let index = 0;

    for (let i = 0; i < array.length; i++) {
      if (array[i] > highestPoints) {
        highestPoints = array[i];
        index = i;
      }
    }

    setMostVotes(index)
  }

  return (
    <div className="container">
      <h1>Anecdote of the Day</h1>
      <p>
        {anecdotes[selected]}
        <span> - {points[selected]} votes</span> 
      </p>
      
      <div className="buttons">
        <button onClick={addVote}>Vote</button>
        <button onClick={getNextAnecdote}>Next anecdote</button>
      </div>
      <h2>Anecdote with the Most Votes</h2>
      <p>
        {anecdotes[mostVotes]}
        <span> - {points[mostVotes]} votes</span>
      </p>
    </div>
  )

}
export default App;
