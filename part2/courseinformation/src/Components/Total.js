import React from "react";

function sum(a, b) {
    return a + b;
  }

const Total = ({ exercises }) => {
  let total = exercises.reduce(sum);

  return (
    <>
      <p className="total">total of {total} exercises </p>
    </>
  );
};

export default Total;
