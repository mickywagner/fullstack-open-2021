import { useDispatch } from "react-redux";
import { createNew } from "../reducers/anecdoteReducer";
import { clearNotification, setNotification } from "../reducers/notificationReducer";


const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNew = async (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(createNew(anecdote))
    dispatch(setNotification(`You added "${anecdote}"`, 10))
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
