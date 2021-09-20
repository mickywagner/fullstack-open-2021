import React from "react";

const Filter = ({ filter, setFilter }) => {
  return (
    <>
      <label htmlFor="filter">Filter shown by name: </label>
      <input
        id="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </>
  );
};

export default Filter;
