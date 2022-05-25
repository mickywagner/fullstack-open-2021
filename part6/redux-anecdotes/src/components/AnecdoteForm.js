import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNew = (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(addAnecdote(anecdote));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <input name="anecdote" />

        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
