import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { clearMessage, setMessage } from "../reducers/messageReducer";

import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNew = async (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = "";
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(addAnecdote(newAnecdote));
    dispatch(setMessage(`You added "${anecdote}"`))
    setTimeout(() => {
      dispatch(clearMessage())
    }, 5000)
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
