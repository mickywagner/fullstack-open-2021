import React from "react";

const Total = ({ exercises }) => {
  let total = exercises.reduce(sum);

  function sum(a, b) {
    return a + b;
  }

  return (
    <>
      <p className="total">total of {total} exercises </p>
    </>
  );
};

export default Total;
