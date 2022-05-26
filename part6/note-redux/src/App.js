import NewNote from "./Components/NewNote";
import Notes from "./Components/Note";
import VisibilityFilter from "./Components/VisibilityFilter";

const App = () => {
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
