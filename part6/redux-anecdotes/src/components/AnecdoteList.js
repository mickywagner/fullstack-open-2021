import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setMessage, clearMessage } from "../reducers/messageReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </>
  );
};
const AnecdotesList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const dispatch = useDispatch();
  const sorted = [...anecdotes]
    .filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes);

  const doDispatch = (anecdote) => {
    dispatch(vote(anecdote.id));
    dispatch(setMessage(`You voted "${anecdote.content}"`));
    setTimeout(() => {
      dispatch(clearMessage());
    }, 5000);
  };

  return (
    <>
      {sorted.map((anecdote) => (
        <Anecdote
          anecdote={anecdote}
          key={anecdote.id}
          handleClick={() => doDispatch(anecdote)}
        />
      ))}
    </>
  );
};

export default AnecdotesList;
