import React, { useState} from "react";

const Filter = ({searchFilter}) => {
  const [filter, setFilter] = useState("");

  const handleChange = (e) => {
    setFilter(e.target.value);
    searchFilter(e.target.value);
  }

  return (
    <>
      <label htmlFor="filter">Filter shown by name: </label>
      <input
        id="filter"
        value={filter}
        onChange={handleChange}
      />
    </>
  );
};

export default Filter;
