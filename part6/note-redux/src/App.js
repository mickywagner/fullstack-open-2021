import { useEffect } from "react";
import { useDispatch } from "react-redux";

import NewNote from "./Components/NewNote";
import Notes from "./Components/Note";
import VisibilityFilter from "./Components/VisibilityFilter";

import { initializeNotes } from "./reducers/noteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch]);

  return (
    <div>
      <h1>Notes:</h1>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
