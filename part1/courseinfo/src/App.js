import React, { useState } from 'react'

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = (param) => () => {
    setValue(param)
  }


  return (
    <div>
      <p>{value}</p>
      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  )
}


export default App;
