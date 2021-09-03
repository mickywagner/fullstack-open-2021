import React, { useState } from 'react';
import Button from "./Components/Button";
import Header from "./Components/Header"
import Statistics from "./Components/Statistics"


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div class="container">
      <Header />

      <div class="buttons">
        <Button onClick={() => setGood(good + 1)} text="Good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
        <Button onClick={() => setBad(bad + 1)} text="Bad" />
      </div>


      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}
export default App;
