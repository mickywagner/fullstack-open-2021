import NewNote from "./Components/NewNote";
import Notes from "./Components/Note"

const App = () => {
    return (
      <div>
        <h1>Notes:</h1>
        <NewNote />
        <Notes />
      </div>
    );
  };

  export default App