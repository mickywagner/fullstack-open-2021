import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const VisibilityFilter = () => {
  const dispatch = useDispatch();

  const filterSelected = (value) => {
    dispatch(filterChange(value))
  };

  return (
    <div>
      <input
        type="radio"
        id="all"
        name="filter"
        value="all"
        onChange={() => filterSelected("ALL")}
      />
      <label htmlFor="all">all</label>
      <input
        type="radio"
        id="important"
        name="filter"
        value="important"
        onChange={() => filterSelected("IMPORTANT")}
      />
      <label htmlFor="important">important</label>
      <input
        type="radio"
        id="non-important"
        name="filter"
        value="non-important"
        onChange={() => filterSelected("NON-IMPORTANT")}
      />
      <label htmlFor="non-important">non-important</label>
    </div>
  );
};

export default VisibilityFilter;
