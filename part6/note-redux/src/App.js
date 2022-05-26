import { useEffect } from "react";
import { useDispatch } from "react-redux";

import NewNote from "./Components/NewNote";
import Notes from "./Components/Note";
import VisibilityFilter from "./Components/VisibilityFilter";

import { setNotes } from "./reducers/noteReducer";
import noteService from "./services/notes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    noteService.getAll().then((notes) => dispatch(setNotes(notes)));
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
