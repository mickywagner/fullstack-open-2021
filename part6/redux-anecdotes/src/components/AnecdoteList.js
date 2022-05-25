import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer"

const Anecdote = ({anecdote, handleClick}) => {
    return(
        <>
        <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
          </div>
        </>
    )
        
        
}
const AnecdotesList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const sorted = anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <>
      {sorted.map((anecdote) => (
        <Anecdote anecdote={anecdote} key={anecdote.id} handleClick={() => dispatch(vote(anecdote.id))}/>
      ))}
    </>
  );
};

export default AnecdotesList
