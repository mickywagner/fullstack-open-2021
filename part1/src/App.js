import React from 'react'

const Header = (props) => (
  <>
    <h1>{props.course}</h1>
  </>
)

const Content = (props) => {
  const parts = props.parts.map(part => <Part part={part.name} exercise={part.exercises} />)

  return (
    <>
      {parts}
    </>
  )
}

const Part = (props) => (
  <p>{props.part} {props.exercise}</p>
)

const Total = (props) => {
  let total = props.parts.map(part => part.exercises).reduce((a, b) => a + b)
  
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

const App = () => {
  const course = "Half Stack application development"
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10
    },
    {
      name: "Using props to pass state",
      exercises: 7
    },
    {
      name: "State of a component",
      exercises: 14
    }
  ]


  return (
    <div>
      <Header course={course} />
      <Content parts={parts}
      />
      <Total parts={parts} />
    </div>
  )
}


export default App;
