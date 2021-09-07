import React from "react";
import Part from "./Part";
import Total from "./Total";

const Content = ({ parts }) => {
  let exercises = parts.map((part) => part.exercises);
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Total exercises={exercises} />
    </>
  );
};

export default Content;
